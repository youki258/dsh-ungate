#!/usr/bin/env node
import path from "node:path";
import { Maintenance, compatibility, PACKAGE } from "../lib/community.js";
import { findDshHome, patchDrift } from "../lib/core.js";
import { currentHost, diagnosticHost, hostSurface } from "../lib/instance.js";
import { readOverrides, writeOverride, clearOverride } from "../lib/anchors.js";
import { logAudit, readAudit } from "../lib/audit.js";
import { readFileSync, writeFileSync } from "node:fs";
import { installPreset, presetStatus } from "../lib/presets.js";
import { readBoost, writeBoost } from "../lib/boost.js";
import { readTuning, writeTuning } from "../lib/tuning.js";
import { createProbe, readProbe } from "../lib/probe.js";
import { hostMain } from "./host-commands.js";
const rawArgs = process.argv.slice(2);
// 宿主补丁面的动作（apply/revert/uninstall/edit）只有一份实现：bin/host-commands.js。
const HOST_OPS = new Set(["apply", "revert", "uninstall", "edit", "legacy-status"]);
const [op = "status", argument, argument2] = rawArgs,
  home = process.env.DSH_HOME || findDshHome();
// Resolve the running/explicit installation, not another machine-wide Desktop.
const aiBase = currentHost();
// 懒构造：status / diagnose / selfcheck 不该因为 profile 目录暂时不可用就直接崩。
const maintenance = () => new Maintenance({
  home,
  profile: process.env.PURGE_PROFILE_DIR,
  aiBase,
});
const HELP = `ungate 用法:
  ungate status                 宿主状态、兼容级别、快照列表
  ungate selfcheck [--json]     20 层自检（broken 时退出码 1）
  ungate apply                  写入 27 条宿主补丁并注入 shim
  ungate revert                 还原宿主补丁
  ungate uninstall              卸载插件（已应用则先还原）
  ungate edit                   编辑注入文件 prompt-inject.md
  ungate toggle                 在位则还原、不在位则应用
  ungate diagnose               锚点漂移诊断
  ungate reanchor list|show|apply|clear <id>
  ungate host-status            磁盘布局与运行入口证据
  ungate probe [new]            运行时注入探针
  ungate audit [--limit n]      动作审计
  ungate boost on|off           尾部强化段
  ungate inject head|tail|both  注入位置
  ungate retry on|off           拒绝单次重试
  ungate rewind on|off          回滚入口
  ungate patches [list|enable|disable]  可选补丁开关
  ungate preset [status|install]        无限制模式预设
  ungate backup | prune | usage | rollback <id> | install <tgz>`;
if (op === "help" || op === "-h" || op === "--help") {
  console.log(HELP);
} else if (HOST_OPS.has(op)) {
  await hostMain([op === "legacy-status" ? "status" : op, ...rawArgs.slice(1)]);
} else try {
  let result;
  if (op === "audit") {
    const n = rawArgs.includes("--limit") ? Number(rawArgs[rawArgs.indexOf("--limit") + 1]) : 20;
    result = { ok: true, entries: readAudit({ limit: Number.isFinite(n) ? n : 20, home }) };
  } else if (op === "reanchor") {
    const sub = argument || "list";
    const host = aiBase || currentHost();
    const drift = await patchDrift(host);
    const rows = [...drift.drifted, ...drift.optionalDrift];
    const byId = (id) => rows.find((r) => r.id === Number(id));
    if (sub === "list") {
      result = {
        host: drift.host,
        overrides: readOverrides(),
        drifted: rows.map((r) => ({
          id: r.id,
          name: r.name,
          optional: r.optional,
          anchors: r.anchors.map((a) => ({ index: a.index, file: a.file, line: a.suggestion?.line })),
        })),
      };
    } else if (sub === "show") {
      const row = byId(argument2);
      if (!row) throw Error(`没有漂移的补丁 #${argument2}`);
      result = row;
    } else if (sub === "clear") {
      const idx = rawArgs.indexOf("--index");
      const wanted = idx >= 0 ? Number(rawArgs[idx + 1]) : undefined;
      if (idx >= 0 && !Number.isInteger(wanted)) throw Error("--index 需要整数");
      result = { cleared: true, overrides: clearOverride(home, argument2, wanted) };
    } else if (sub === "apply") {
      const row = byId(argument2);
      if (!row) throw Error(`没有漂移的补丁 #${argument2}`);
      const idxFlag = rawArgs.indexOf("--index");
      const wanted = idxFlag >= 0 ? Number(rawArgs[idxFlag + 1]) : NaN;
      if (idxFlag >= 0 && !Number.isInteger(wanted)) throw Error("--index 需要整数");
      const target = idxFlag >= 0 ? row.anchors.find((a) => a.index === wanted) : row.anchors[0];
      if (!target) throw Error("找不到对应的锚点（用 --index 指定）");
      const text = readFileSync(target.file, "utf8").replace(/\r\n/g, "\n");
      const lines = text.split("\n");
      const oldCount = String(target.head || "").split("\n").length;
      const linesFlag = rawArgs.indexOf("--lines");
      let from;
      let to;
      if (linesFlag >= 0) {
        const [a, b] = String(rawArgs[linesFlag + 1]).split("-").map(Number);
        if (!Number.isInteger(a) || !Number.isInteger(b) || a < 1 || b < a) throw Error("--lines 需要形如 120-132");
        from = a - 1;
        to = b;
      } else {
        const center = (target.suggestion?.line || 1) - 1;
        const span = Math.max(1, Math.min(oldCount || 3, 40));
        from = Math.max(0, center - Math.floor(span / 2));
        to = Math.min(lines.length, from + span);
      }
      const candidate = lines.slice(from, to).join("\n");
      if (!candidate.trim()) throw Error("取到的片段为空，用 --lines 指定范围");
      const occurrences = text.split(candidate).length - 1;
      if (occurrences !== 1) throw Error(`候选片段在文件里出现 ${occurrences} 次，必须唯一；用 --lines 缩小范围`);
      const preview = {
        patch: row.id,
        name: row.name,
        index: target.index,
        file: target.file,
        lines: `${from + 1}-${to}`,
        candidate: candidate.slice(0, 800),
        applies: (await import("../lib/core.js")).applyReplacementsToText(
          text,
          { ...row, replacements: [{ pattern: candidate, replace: "x" }], markers: ["__never__"] },
          target.file,
        ).changed,
      };
      if (!rawArgs.includes("--yes")) {
        result = { dryRun: true, ...preview, hint: "确认无误后加 --yes 写入本地重锚覆盖" };
      } else {
        writeOverride(home, row.id, target.index, candidate, { host: drift.host });
        logAudit("reanchor", { patch: row.id, index: target.index, host: drift.host }, home);
        const core = await import("../lib/core.js");
        core.refreshAnchorOverrides();
        result = { written: true, ...preview, status: (await core.patchStatus(host))[row.id] };
      }
    } else {
      throw Error("用法：ungate reanchor list | show <id> | apply <id> [--index n] [--lines a-b] [--yes] | clear <id>");
    }
  } else if (op === "patches") {
    const sub = (argument || "list").toLowerCase();
    const current = readTuning(home).extraPatches || [];
    const ids = String(argument2 || "").split(",").map(Number).filter((n) => Number.isInteger(n) && n > 0);
    const optIn = (await import("../lib/core.js")).ALL_PATCHES.filter((p) => p.disabledByDefault).map((p) => p.id);
    if (sub === "enable" || sub === "disable") {
      if (!ids.length) throw Error(`用法：ungate patches ${sub} ${optIn.join(",") || "<id,id>"}`);
      const known = new Set(optIn);
      const unknown = ids.filter((id) => !known.has(id));
      if (unknown.length) throw Error(`只有默认关闭的补丁可以手动开关：${[...known].join(",")}（未知：${unknown.join(",")}）`);
      const next = sub === "enable"
        ? [...new Set([...current, ...ids])].sort((a, b) => a - b)
        : current.filter((id) => !ids.includes(id));
      const saved = writeTuning({ extraPatches: next }, home);
      logAudit("patches_setting", { action: sub, ids: ids.join(","), effective: saved.extraPatches.join(",") }, home);
      result = { ok: true, extraPatches: saved.extraPatches, restart_required: false, hint: sub === "enable" ? "点一次「应用」写入宿主，然后退出重开" : "关闭只影响以后的「应用」；要从宿主真正移除，点一次「还原」" };
    } else {
      result = {
        ok: true,
        optIn,
        extraPatches: current,
        hint: optIn.length ? `ungate patches enable ${optIn.join(",")} | disable ${optIn[0]}` : "当前发行版没有可手动开关的可选补丁",
        note: optIn.length ? "默认关闭：开启会取消重复调用提醒与工具结果修剪，长会话上下文会变大" : "可选补丁（#18/#19）已随注入面缩减下线",
      };
    }
  } else if (op === "retry") {
    const sub = (argument || "status").toLowerCase();
    if (sub === "on" || sub === "off") {
      const next = writeTuning({ refusalRetry: sub === "on" });
      result = { ok: true, refusalRetry: next.refusalRetry, restart_required: false, effective: "next-turn" };
    } else {
      result = { ok: true, refusalRetry: readTuning(home).refusalRetry === true, hint: "ungate retry on|off" };
    }
  } else if (op === "rewind") {
    const sub = (argument || "status").toLowerCase();
    if (sub === "on" || sub === "off") {
      const next = writeTuning({ rewind: sub === "on" });
      result = { ok: true, rewind: next.rewind, restart_required: true };
    } else {
      result = { ok: true, rewind: readTuning(home).rewind !== false, hint: "ungate rewind on|off" };
    }
  } else if (op === "inject") {
    // 注入位置：head / tail / both。改完下一轮对话即生效（section 每轮回读 tuning），
    // 不需要重启；面板显示的段位会在下一次读取时刷新。
    const sub = (argument || "status").toLowerCase();
    const allowed = ["head", "tail", "both"];
    if (allowed.includes(sub)) {
      const next = writeTuning({ injectPosition: sub });
      logAudit("tuning_setting", { setting: "injectPosition", value: next.injectPosition }, home);
      result = { ok: true, injectPosition: next.injectPosition, restart_required: false };
    } else if (sub === "status" || !argument) {
      result = { ok: true, injectPosition: readTuning(home).injectPosition || "head", hint: "ungate inject head|tail|both" };
    } else {
      result = { ok: false, error: "injectPosition 只接受 head / tail / both", value: sub };
      process.exitCode = 2;
    }
  } else if (op === "probe") {
    if (argument === "new" || argument === "create") {
      const probe = createProbe();
      logAudit("probe", { nonce: probe.nonce }, home);
      result = { ok: true, ...probe };
    } else {
      const probe = readProbe();
      result = { ok: true, active: !!probe, nonce: probe?.nonce || "", hint: "ungate probe new" };
    }
  } else if (op === "preset") {
    const sub = argument || "status";
    if (sub === "install" || sub === "update") {
      result = installPreset({ force: rawArgs.includes("--force") });
      logAudit("preset", { action: result.action, dir: result.dir }, home);
    } else if (sub === "status" || sub === "path") {
      result = presetStatus(home);
    } else {
      throw Error("用法：ungate preset [status|install [--force]]");
    }
  } else if (op === "boost") {
    if (argument === "on" || argument === "off") result = { enabled: writeBoost(argument === "on") };
    else result = { enabled: readBoost(), hint: "ungate boost on|off" };
  } else if (op === "selfcheck" || op === "check-bypass") {
    // The extracted installer runs migrate before runtime dependencies are installed.
    const { selfCheck } = await import("../lib/selfcheck.js");
    // 从 CLI 直接跑（node bin/community.js）时 argv 指向插件自身，currentHost() 认不出宿主；
    // selfCheck 允许传空 aiBase 走自己的解析，这里把 DSH_HOME 一起传下去，避免用默认值再猜一次。
    const report = await selfCheck(aiBase || "", process.env.DSH_HOME || findDshHome());
    process.exitCode = report.state === "broken" ? 1 : 0;
    if (rawArgs.includes("--json")) result = report;
    else {
      const notApplicable = report.patch.not_applicable || 0;
      const naNote = notApplicable ? `（另 ${notApplicable} 条明确不适用、已关闭或无需迁移）` : "";
      const missingNote = report.patch.missing_file ? ` · 目标缺失 ${report.patch.missing_file} 条（详见诊断）` : "";
      const lines = [
        `Ungate 自检 · ${report.host || "(未定位宿主)"}`,
        `  DSH ${report.host_version} · ${report.level} · 宿主补丁 ${report.patch.applied}/${report.patch.total}${naNote}${missingNote}`,
        "",
      ];
      for (const layer of report.layers) {
        const mark = ["pending", "inferred", "unknown"].includes(layer.state) ? "⏳" : layer.ok ? "✓" : "✗";
        const tail = layer.note
          || (layer.broken.length ? JSON.stringify(layer.broken) : "")
          || (layer.pending && layer.pending.length ? `待应用 #${layer.pending.join("/#")}` : "");
        lines.push(`  ${mark} ${layer.title}  ${layer.applied}/${layer.required ?? layer.total}${tail ? "  " + tail : ""}`);
      }
      const pendingCount = (report.summary && report.summary.pending && report.summary.pending.patches) || 0;
      lines.push(
        "",
        report.state === "pending"
          ? `结论：有 ${pendingCount} 条补丁待应用 —— 点一次「应用」，然后退出重开 DSH 即可。`
          : report.state === "broken"
            ? "结论：有层真的没生效（✗），见上面。"
            : ["unknown", "inferred"].includes(report.state)
              ? "结论：未发现已确认故障，但存在推导值或未确认项，见逐层说明。"
              : "结论：所有层都在位。",
      );
      if (rawArgs.includes("--text")) {
        console.log(lines.join("\n"));
        process.exit(report.state === "broken" ? 1 : 0);
      }
      result = { ok: report.ok, text: lines.join("\n"), summary: report.summary };
    }
  } else if (op === "host-status" || op === "host-check") {
    const { hostLayoutEvidence } = await import("../lib/host-layout.js");
    result = hostLayoutEvidence(aiBase);
  } else if (op === "diagnose") {
    const target = diagnosticHost();
    const drift = target
      ? await patchDrift(target, undefined, {surface:hostSurface(target),dshHome:home})
      : {host:"",state:"unknown",checked:0,drifted:[],optionalDrift:[],chained:[],missing:[],
          note:"未定位当前实例；请明确 DSH_BASE 或 PURGE_DSH_CLI，不扫描其他安装"};
    result = { name: "Ungate", package: PACKAGE, compatibility: compatibility(target), ...drift };
  } else if (op === "status") {
    const target = diagnosticHost();
    result = {
      name: "Ungate",
      package: PACKAGE,
      compatibility: compatibility(target),
      host_selection: target ? "explicit-or-running" : "unresolved",
      ...(target ? {} : { hint: "未取得当前实例入口；请指定 DSH_BASE / PURGE_DSH_CLI，或查看正在运行宿主的面板诊断。这不是插件未安装的证明。" }),
      backups: (() => { try { return maintenance().list(); } catch { return []; } })(),
    };
  } else if (op === "toggle") {
    // 一键开关：宿主实质补丁在位 → 还原原生；不在位 → 应用。返回动作与前后状态。
    const core = await import("../lib/core.js");
    const target = diagnosticHost();
    if (!target) throw Error("未定位当前实例；请指定 DSH_BASE / PURGE_DSH_CLI 后重试");
    const statusMap = await core.patchStatus(target);
    const counts = {};
    for (const v of Object.values(statusMap)) counts[v] = (counts[v] || 0) + 1;
    const on = (counts.applied || 0) + (counts.already || 0);
    const off = (counts.missing || 0) + (counts.reverted || 0) + (counts.pending || 0);
    if (on === 0 && off === 0) throw Error("宿主上没有任何可判定的补丁状态；请显式执行 apply 或 revert");
    const action = on >= off ? "revert" : "apply";
    // toggle 只管宿主补丁面；全局 shim 不随 toggle 还原（跨实例资产，显式 revert 才动）。
    await hostMain([action]);
    const exit = process.exitCode ?? 0;
    result = {
      action,
      host: target,
      before: { on, off, counts },
      exit,
      note: action === "revert"
        ? "已还原原生宿主；重启 dsh 服务后生效（systemctl restart dsh-web-iso 或 dsh-web）。"
        : "已应用 Ungate 补丁；重启 dsh 服务后生效（systemctl restart dsh-web-iso 或 dsh-web）。",
    };
  } else if (op === "backup") result = await maintenance().backup("cli");
  else if (op === "prune") result = await maintenance().pruneLocked();
  else if (op === "usage") result = maintenance().usage();
  else if (op === "rollback") result = await maintenance().rollback(argument);
  else if (op === "install" || op === "migrate") {
    if (!argument) throw Error("需要安装包路径");
    result = await maintenance().install(path.resolve(argument), {
      reason: op === "migrate" ? "before-migration" : "before-update",
      migrate: op === "migrate",
    });
  } else
    throw Error(
      "用法：ungate status | host-status | host-check | diagnose | selfcheck [--json] | toggle | boost on|off | patches [list|enable ids|disable ids] | probe [new] | audit [--limit n] | preset [status|install] | backup [prune|usage] | rollback <备份ID> | migrate <tgz> | apply | revert | uninstall | edit",
    );
  console.log(JSON.stringify(result, null, 2));
} catch (e) {
  console.error(e.message);
  process.exitCode = 1;
}

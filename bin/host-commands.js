import * as core from "../lib/core.js";
import * as rules from "../lib/rules.js";


// 子命令是唯一入口；老写法（--apply 等）仍然认，方便已有脚本与 CI。
const ALIASES = {
  "--apply": "apply",
  "--revert": "revert",
  "--uninstall": "uninstall",
  "--edit": "edit",
  "--status": "status",
  "--help": "help",
};
function normalizeMode(args) {
  const raw = args[0] || "status";
  return ALIASES[raw] || raw.replace(/^--/, "");
}

function printStatus(state, hostCore = core) {
  const out = [];
  out.push("Ungate 状态 / Status");
  out.push("  宿主 / surface " + (state.surface || "web"));
  out.push("  DSH_HOME      " + state.dsh_home);
  if (state.desktop_install) out.push("  桌面安装       " + state.desktop_install);
  if (state.ai_base) {
    out.push("  插件根 / root  " + state.ai_base);
    for (const [key, fp] of Object.entries(state.files)) {
      out.push(`    ${key.padEnd(22)} ${fp}`);
    }
  } else {
    out.push("  插件根 / root  " + hostCore.missingAiBaseMessage());
  }
  out.push(`  shim 目录      ${state.shim_dir || "未定位 / not found"}`);
  out.push(`  备份 / backup  ${state.has_backup ? "有 / yes" : "无 / no"}`);
  out.push(`  注入文件       ${state.override_path}`);
  out.push(`  注入状态       ${state.override_status}`);
  out.push("");
  if (!state.ai_base) {
    out.push("  补丁 未定位宿主 / not resolved —— 设 DSH_BASE 或 PURGE_DSH_CLI 后重试");
  } else {
  out.push(`  补丁 ${state.patches_applied}/${hostCore.ALL_PATCHES.length} 已清洗, ${state.patches_pending} 待清洗`);
  for (const p of hostCore.ALL_PATCHES) {
    const s = state.patch_status[p.id];
    const mark = s === "applied" ? "✓" : s === "pending" ? "✗" : "·";
    out.push(`    ${mark} [#${String(p.id).padEnd(2)}] ${p.name.padEnd(30)} ${p.layer}/${p.layer_en} — ${s}`);
  }
  }
  out.push("");
  out.push(`  shim: dsh.cmd=${state.shim_cmd}  dsh.ps1=${state.shim_ps1}  dsh=${state.shim_bin}`);
  return out.join("\n");
}

export async function main(args = process.argv.slice(2), dependencies = {}) {
  const hostCore = dependencies.core || core;
  const hostRules = dependencies.rules || rules;
  const mode = normalizeMode(args);

  if (mode === "help" || args.includes("-h") || args.includes("--help")) {
    console.log(`ungate 用法:
  ungate status     显示宿主状态与逐条补丁状态
  ungate apply      应用宿主补丁（含 shim 注入）
  ungate revert     还原宿主补丁
  ungate uninstall  卸载插件（已应用则先还原）
  ungate edit       编辑注入文件 prompt-inject.md
  全部命令：ungate help`);
    return;
  }

  const state = await hostCore.gatherState();
  console.log(printStatus(state, hostCore));
  console.log("");

  if (mode === "apply") {
    let failed = false;
    if (!state.ai_base) {
      console.log("[ERROR] " + hostCore.missingAiBaseMessage());
      console.log("  fix: 把 DSH_BASE 指到含 dsh-agent-instructions/lib 的 @deepseek-ai 目录");
      process.exitCode = 1;
      return;
    }
    const inject = hostRules.resolveInjectText(state.dsh_home);
    if (!inject.text) {
      console.log("[ERROR] 提示词和规则集都是空的，必须先添加提示词");
      process.exitCode = 1;
      return;
    }
    const { hosts, report } = await hostCore.applyPatchesAllHosts(hostCore.ALL_PATCHES, {
      preserveClientBundles: false,
      forApply: true,
    });
    for (const h of hosts) console.log(`  宿主 / host → ${h.aiBase}`);
    for (const r of report) {
      const m = r.status === "applied" ? "✓ 已清洗" : r.status === "already" ? "- 已是最新" : r.status === "missing_file" ? "⚠ 文件缺失" : `✗ ${r.status}`;
      console.log(`  ${m} patch #${String(r.patch_id).padEnd(2)} ${r.name}`);
    }
    const summary = hostCore.summarizeApplyReport(report);
    failed = summary.failed.length > 0;
    const flashHost = hosts[0]?.aiBase || state.ai_base;
    const flash = hostCore.silenceCmdFlash(flashHost);
    console.log(`  cmd-flash=${flash.entry} phase-1=${flash.phase1} ok=${flash.ok}`);
    if (flash.ok === false) failed = true;
    if (hosts.length > 1) {
      console.log(`  多宿主 / multi-host: ${hosts.length} 份 @deepseek-ai 已清洗`);
    }
    console.log(inject.source === "rule"
      ? "  - 使用当前规则集，不改写提示词文件"
      : "  - 使用已有提示词文件");
    if (state.shim_dir) {
      const r = await hostCore.patchShim(state.shim_dir);
      for (const [fname, st] of Object.entries(r)) {
        if (typeof st === "string" && /^(error:|write_error|failed)/.test(st)) failed = true;
        if (st === "patched") console.log(`  ✓ shim ${fname} 注入 / injected`);
        else if (st === "already_patched") console.log(`  - shim ${fname} 已注入 / already injected`);
        else if (st === "missing") console.log(`  - shim ${fname} 不存在 / missing`);
        else console.log(`  ⚠ shim ${fname}: ${st}`);
      }
    } else {
      console.log("  ⚠ 未定位 shim 目录，跳过注入");
    }
    console.log("");
    if (failed) {
      console.error("应用未完成 / Apply incomplete. 请处理上述错误；重启不能修复写入失败。");
      process.exitCode = 1;
    } else console.log("全部完成 / All done。重启 dsh 生效 / Restart dsh to take effect.");
  } else if (mode === "revert") {
    let failed = false;
    const skipShim = args.includes("--no-shim");
    if (state.ai_base || hostCore.enumeratePatchAiBases().length) {
      const { reverted, errors } = await hostCore.revertAllHosts();
      if (errors.length) failed = true;
      for (const p of reverted) console.log(`  ✓ 已还原 / Reverted ${p}`);
      for (const [p, e] of errors) console.log(`  ⚠ 还原失败 ${p}: ${e}`);
      if (reverted.length === 0) console.log("  - 没有补丁备份可还原 / no patch backup");
    }
    if (skipShim) console.log("  - shim 还原按 --no-shim 跳过 / shim restore skipped by --no-shim");
    else if (state.shim_dir) {
      const r = await hostCore.revertShim(state.shim_dir);
      for (const [fname, st] of Object.entries(r)) {
        if (typeof st === "string" && /^error:/.test(st)) failed = true;
        if (st === "reverted" || st === "stripped_inject") console.log(`  ✓ shim ${fname}: ${st}`);
        else console.log(`  - shim ${fname}: ${st}`);
      }
    }
    // 还原后必须复核：备份缺失（例如宿主目录只读、从未写过 .bak）时
    // revertAllHosts() 只会「没有备份可还原」，不能据此报告还原成功。
    if (!failed && state.ai_base && typeof hostCore.patchStatus === "function") {
      try {
        const after = await hostCore.patchStatus(state.ai_base);
        const left = Object.entries(after).filter(([, v]) => v === "applied" || v === "already").map(([id]) => id);
        if (left.length) {
          failed = true;
          console.error(`  还有 ${left.length} 条补丁在宿主里（#${left.join("/#")}）：没有可用的 .bak 备份，或宿主目录不可写。`);
        }
      } catch (e) {
        failed = true;
        console.error(`  还原后复核失败：${e && e.message ? e.message : e}`);
      }
    }
    console.log("");
    if (failed) {
      console.error("回滚未完成 / Revert incomplete. 原文件与失败备份保留，请处理上述错误。");
      process.exitCode = 1;
    } else console.log("回滚完成 / Revert done。重启 dsh 后恢复 / restart to restore.");
    console.log("注: prompt-inject.md 保留（用户文件）/ prompt-inject.md kept (user file)");
  } else if (mode === "uninstall") {
    const { uninstallPurge, finishUninstallCleanup } = await import("../lib/uninstall.js");
    const result = await finishUninstallCleanup(await uninstallPurge());
    if (result.applied) console.log("  已检测到补丁，已还原回原版。");
    else console.log("  未检测到已应用补丁，仍会清除插件文件。");
    if (result.override?.removed) console.log(`  已删除 ${result.override.path}`);
    if (result.stripped?.length) console.log(`  已从 profile 移除: ${result.stripped.join(", ")}`);
    for (const e of result.errors || []) console.log(`  ⚠ ${e}`);
    if (!result.ok) {
      console.log("  卸载未完成：请检查上面的还原、注销或文件清理错误。");
      process.exitCode = 1;
      return;
    }
    console.log("");
    console.log("卸载完成。请重启 dsh。");
  } else if (mode === "edit") {
    const r = hostCore.editOverride(state.dsh_home);
    if (!r.ok && r.needCreate) {
      await hostCore.installOverride(state.dsh_home, true);
      console.log(`  ✓ 已创建默认注入文件：${state.override_path}`);
      hostCore.editOverride(state.dsh_home);
    } else {
      console.log(`  → 已打开 ${r.editor} 编辑注入文件：${r.path}`);
    }
    console.log("  编辑完成后重启 dsh 生效。");
  } else {
    console.log("默认不清洗，使用 --apply 应用清洗。");
  }
}

export { main as hostMain, normalizeMode };

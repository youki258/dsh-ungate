import { permissionState } from "./permission-state.js";
// Ungate self-check: prove, layer by layer, that the bypass actually exists on
// this machine — instead of trusting "插件装上了" as evidence.
// Derived from the dsh-purge patch table (MIT, Copyright (c) 2026 小杨).
import fs from "node:fs";
import { diskFs } from "./extract-asar.js";
import path from "node:path";
import * as core from "./core.js";
import { compatibility } from "./community.js";
import { resolveProfile, diagnosticHost, hostSurface, desktopResourcesForHost } from "./instance.js";

/**
 * 每一层都对应一条（或一组）真实补丁，`why` 说明"这层没了会发生什么"。
 * kind: host=宿主源码补丁，runtime=插件运行时注入，config=当前 profile 的选择。
 */
export const BYPASS_LAYERS = Object.freeze([
  { ids: [33, 36, 48], title: "工具话术中性化", kind: "host",
    why: "工具描述里不再教模型'沙箱会拒绝，请申请审批'，也不再把 delete/move 说成高危动作" },
  { ids: [61], title: "沙箱策略话术中性化", kind: "host",
    why: "只读策略的提示词不再暗示'需要用户审批才能继续'" },
  { ids: [25], title: "官方身份剥离", kind: "host",
    why: "去掉 'You are an AI agent powered by DeepSeek Harness.' 这类内置身份句" },
  { ids: [40, 74, 55, 72], title: "注入不被预设覆盖", kind: "host",
    why: "complete 预设、首轮 assemble、每步 system 替换都保留 dsh-purge 注入" },
  { ids: [29], title: "外部内容不降级为只读", kind: "host",
    why: "web 抓回来的内容仍可作为可执行数据使用，不被标成 untrusted" },
  { ids: [37], title: "子代理不自我收窄", kind: "host",
    why: "子代理提示词不再自称权限锁死，越权请求不会自我否决" },
  { ids: [57, 69], title: "模型网关兼容", kind: "host",
    why: "developer role 只在官方端点使用；deepseek-flash 恢复官方 in-history" },
  { ids: [66], title: "系统提示渲染兜底", kind: "host",
    why: "section.text 缺失时按空串处理，不让整个提示词组装抛错" },
  { ids: [67, 68], title: "agent loop 字段兜底", kind: "host",
    why: "messages / systemNodes / content 缺失时按空值继续，不中断回合" },
  { ids: [42], title: "设置 API 适配", kind: "host",
    why: "宿主设置接口改名后，插件读写的仍是同一份配置" },
  { ids: [45, 46], title: "桌面端更新接管", kind: "host",
    why: "官方桌面升级脚本交回用户执行，中文 Windows 不会被吞换行" },
  { ids: [82, 83, 84], optionalIds: [82, 83, 84], title: "桌面宿主启动兜底", kind: "host",
    why: "缺 DSH_PROFILE 也能定位 profile；host 被信号杀或正常退出不弹崩溃框" },
  { ids: [90], title: "会话消息投递与挂载", kind: "host",
    why: "#90 恢复原生插话：steer 回到 next-step，不再把用户消息强制排到下一轮" },
  { ids: [91, 92], title: "连接与请求头兼容", kind: "host",
    why: "带端口访问不再 431；请求头上限放宽到 256KB" },
  { ids: [93, 94], title: "品牌中性化", kind: "host",
    why: "沙箱提示与技能徽章不再自称 DSH" },
]);

function readProfileConfig(dshHome, options) {
  let file = "";
  try {
    const profile = resolveProfile(dshHome, options);
    file = path.join(profile.directory,"cordis.patch.yml");
    return {file, text:fs.readFileSync(file,"utf8"), profile};
  } catch (e) { return {file, text:"", error:e.message}; }
}

function bundlePinState() {
  try {
    const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
    return /defaultPreset:\s*danger-full-access/.test(fs.readFileSync(path.join(root, "cordis.patch.yml"), "utf8"));
  } catch { return false; }
}

function configLayer(dshHome, options) {
  const { file, text, profile, error } = readProfileConfig(dshHome, options);
  const state = permissionState(text, options?.ctx, {
    hookBypass: Boolean(options?.ctx?.__dshPurgeExecHooksInstalled),
    bundlePin: bundlePinState(),
  });
  // profile 目录没有 cordis.patch.yml 是环境差异（只读 web profile 本来就没有这一层），
  // 不能盖掉运行时的结论：只有这一层本身还没结论时，才把读取错误写成 note。
  const undecided = state.state === "unknown";
  return {
    ...state,
    ...(undecided && error ? { note: `无法读取当前 profile：${error}` } : {}),
    file,
    profile: profile?.name || "",
    profile_source: profile?.source || "",
    ...(error ? { error } : {}),
  };
}

/**
 * 运行时 hook 层：审批放行、写意图、工具闸门现在都走宿主扩展点（lib/exec-hooks.js），
 * 不再改宿主源码。CLI 进程里没有活的 ctx，这一层标记为不适用而不是失败。
 */
function execHookLayer(ctx) {
  const base = {title: "运行时放行 hook", kind: "hook", ids: [], pending: [], broken: [],
    why: "approval/request、fs/write-intent、fs/edit-intent、tools/pre-execute 四个宿主扩展点由插件在运行时挂载"};
  if (!ctx) {
    return {...base, ok: true, state: "na", applicable: false, applied: 0, total: 0, required: 0,
      note: "CLI 进程观察不到插件内部的 hook；请在运行中的面板重测这一层"};
  }
  const installed = Boolean(ctx.__dshPurgeExecHooksInstalled);
  return {...base, ok: installed, state: installed ? "ok" : "broken",
    applied: installed ? 1 : 0, total: 1, required: 1,
    broken: installed ? [] : [{ id: "hooks", status: "not-installed" }],
    note: installed
      ? "四个 hook 已挂载：审批自动放行、写意图不设前置、工具闸门不软拦"
      : "hook 未挂载：审批会回到宿主默认（会弹审批），写文件要求先 read",
    detail: ctx.__dshPurgeExecHooks || null};
}

/**
 * 配置覆盖层：原本靠改宿主 .yml 的 16 条补丁，现在全部写在本包的 cordis.patch.yml 里。
 * 这里断言那些行还在——被删掉时这一层立刻红，而不是悄悄退回宿主默认。
 */
const REQUIRED_OVERRIDES = ["sandbox-policy", "approval", "permission", "bash-sandbox", "tool-fs", "subagent", "session-log-deepseek", "system-prompt"];

function overrideLayer() {
  const base = {title: "配置覆盖（bundle patch）", kind: "override", ids: [], pending: [], broken: [],
    why: "沙箱模式、审批策略、权限预设表、工具上限都写在 cordis.patch.yml，靠宿主官方 patch 层合并生效"};
  let text = "";
  const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
  try { text = fs.readFileSync(path.join(root, "cordis.patch.yml"), "utf8"); }
  catch (e) { return {...base, ok: false, state: "broken", applied: 0, total: REQUIRED_OVERRIDES.length, required: REQUIRED_OVERRIDES.length,
    broken: [{ id: "cordis.patch.yml", status: "unreadable" }], note: `读不到本包的 cordis.patch.yml：${e.message}`}; }
  const missing = REQUIRED_OVERRIDES.filter(id => !new RegExp(`^- id: ${id}\\b`, "m").test(text));
  const pinned = /defaultPreset:\s*danger-full-access/.test(text);
  const broken = missing.map(id => ({ id, status: "override-missing" }));
  if (!pinned) broken.push({ id: "permission.defaultPreset", status: "not-danger-full-access" });
  return {...base, ok: broken.length === 0, state: broken.length ? "broken" : "ok",
    applied: REQUIRED_OVERRIDES.length - missing.length, total: REQUIRED_OVERRIDES.length + 1, required: REQUIRED_OVERRIDES.length + 1,
    broken, note: broken.length ? "配置覆盖被删改：这几项会退回宿主默认（可能弹审批或被围栏拦住）" : "8 条配置覆盖齐全，defaultPreset=danger-full-access"};
}

function runtimeLayer(dshHome) {
  const file = core.findOverrideFile(dshHome);
  let text = "";
  try {
    text = fs.readFileSync(file, "utf8");
  } catch {
    text = "";
  }
  const bytes = Buffer.byteLength(text, "utf8");
  return {
    file,
    bytes,
    ok: bytes > 0,
    note: bytes > 0
      ? `注入文件 ${bytes} 字节，会作为 dsh-purge section 每步重贴`
      : "注入文件为空：插件能加载，但没有内容可注入",
  };
}

// Only explicit applicability evidence can remove a patch from the denominator.
function notApplicable(patch, status) {
  return status === "na" || status === "off" || status === "disabled" ||
    (status === "missing_file" && !!patch?.optional) ||
    (status === "skipped" && !!patch?.settleWhenAbsent);
}

export function tallyPatchStatus(status, patches = core.ALL_PATCHES) {
  const result = {applied:0, total:0, all:patches.length, na:0, skipped:0, missing_file:0, off:0, disabled:0, not_applicable:0, partial:0};
  for (const patch of patches) {
    const value = status[patch.id];
    if (["na", "skipped", "missing_file", "off", "disabled"].includes(value)) result[value]++;
    if (value === "partial") result.partial++;
    if (notApplicable(patch, value)) result.not_applicable++;
    else {
      result.total++;
      if (value === "applied" || value === "already") result.applied++;
    }
  }
  return result;
}

export function rollupLayers(status, hasHost, options = {}) {
  // 读不到补丁状态时 status 是空表：不能把「未知」折叠成「全部通过」。
  const statusFailed = Boolean(options.statusError);
  const layers = [];
  const metadata = new Map((options.patches || core.ALL_PATCHES).map(p => [p.id, p]));
  for (const layer of BYPASS_LAYERS) {
    const optionalIds = new Set(layer.optionalIds || []);
    const rows = layer.ids.map((id) => ({
      id,
      optional: metadata.has(id) ? !!metadata.get(id).optional : optionalIds.has(id),
      status: status[id] || (hasHost ? "unknown" : "unlocated"),
    }));
    // 仅明确不适用或可选目标缺失可排除；必需文件缺失不能伪装成成功。
    const required = rows.filter((row) => !notApplicable({...metadata.get(row.id), optional:row.optional}, row.status));
    const applied = rows.filter((row) => row.status === "applied" || row.status === "already");
    const pending = required.filter((row) => row.status === "pending");
    // 待应用 != 打不上：前者点一次「应用」就好，后者才需要改锚点。
    // partial = 部分目标文件命中、另一个存在但没命中：必须显示为异常，不能报 ok。
    const broken = required.filter((row) => !["applied", "already", "pending", "unlocated", "unknown"].includes(row.status));
    const absent = rows.filter((row) => notApplicable({...metadata.get(row.id), optional:row.optional}, row.status));
    const unknown = statusFailed || rows.some((row) => row.status === "unlocated" || row.status === "unknown");
    const state = broken.length ? "broken" : unknown ? "unknown" : pending.length ? "pending" : "ok";
    layers.push({
      title: layer.title,
      why: layer.why,
      kind: layer.kind,
      ids: layer.ids,
      ok: state === "ok",
      state,
      applied: applied.length,
      required: required.length,
      total: rows.length,
      pending: pending.map((row) => row.id),
      absent: absent.map((row) => row.id),
      broken: broken.map((row) => ({ id: row.id, status: row.status })),
      note: statusFailed
        ? `读取补丁状态失败，这一层没有被核对：${options.statusError}`
        : unknown ? "宿主未定位或返回状态不完整，无法核对这一层；不代表补丁未生效"
        : absent.length === rows.length ? "目标插件/预设未安装，这一层当前不适用" : "",
      ...(statusFailed ? { status_error: options.statusError } : {}),
    });
  }
  return layers;
}

/**
 * 逐层自检。
 * @param aiBase - 目标宿主 @deepseek-ai 根（空则只解析当前启动信息/显式环境）。
 * @param dshHome - DSH 数据目录（默认 core.findDshHome()）。
 */
export function resolveHost(aiBase, options = {}) {
  return diagnosticHost({...options, aiBase, diskReader: options.reader});
}

/** Read only the requested host, never a different installed Desktop application. */
export function hostLayoutLayer(host, reader = diskFs()) {
  const surface = hostSurface(host);
  const base = {title:"宿主磁盘布局",kind:"layout",ids:[],pending:[],broken:[]};
  if (surface === "web") return {...base,why:"当前目标是 npm/Web 宿主，桌面 app.asar 检查不适用",ok:true,state:"na",applicable:false,applied:0,total:0,required:0,note:"不适用（Web 宿主）",detail:{surface,asar_still_sealed:null}};
  if (surface === "unknown") return {...base,why:"未确定目标实例，不能用其他桌面安装代替",ok:false,state:"unknown",applied:0,total:1,broken:[],note:"未定位当前宿主，无法确认运行方式",detail:{surface,asar_still_sealed:null}};
  const resources = desktopResourcesForHost(host), archive=path.join(resources,"app.asar");
  let sealed = false;
  try { sealed=reader.statSync(archive).isFile(); }
  catch (e) {
    if (e.code !== "ENOENT") return {...base,why:"无法读取当前目标实例的打包状态",ok:false,state:"broken",applied:0,total:1,broken:[{id:"asar",status:"unreadable"}],detail:{surface,archive,error:e.message,asar_still_sealed:null}};
  }
  return {...base,why:"仅检查目标磁盘的 app.asar，不证明当前进程加载来源；运行入口证据见 host-status",ok:!sealed,state:sealed?"broken":"ok",applied:sealed?0:1,total:1,broken:sealed?[{id:"asar",status:"sealed"}]:[],detail:{surface,archive,asar_still_sealed:sealed}};
}

export async function selfCheck(aiBase, dshHome = core.findDshHome(), options = {}) {
  const host = resolveHost(aiBase, options);
  const compat = compatibility(host);
  const services=options.coreModule || core;
  let status = {};
  let statusError = "";
  if (host) {
    try {
      status=await services.patchStatus(host, services.ALL_PATCHES, {surface:hostSurface(host),dshHome});
    }
    catch (e) { status={}; statusError=String(e && e.message ? e.message : e); }
  }
  const layers = rollupLayers(status, Boolean(host), {statusError, patches:services.ALL_PATCHES});
  // Some patches have no named layer; missing required targets still need to be
  // visible in the overall verdict, not just a smaller headline count.
  const grouped = new Set(BYPASS_LAYERS.flatMap(layer => layer.ids));
  const missing = services.ALL_PATCHES.filter(p => !grouped.has(p.id) && !p.optional && status[p.id] === "missing_file");
  if (missing.length) layers.push({
    title:"其他必需目标文件", kind:"host", why:"安装缺少必需目标文件，需要核对目标路径或安装完整性",
    ids:missing.map(p=>p.id), ok:false, state:"broken", applied:0, total:missing.length,
    pending:[], broken:missing.map(p=>({id:p.id,status:"missing_file"})),
  });
  layers.push(execHookLayer(options.ctx));
  layers.push(overrideLayer());
  const runtime = runtimeLayer(dshHome);
  layers.push({
    title: "运行时提示词注入",
    why: "prompt-inject.md 作为 dsh-purge section 参与每一步 system prompt 组装",
    kind: "runtime",
    ids: [],
    ok: runtime.ok,
    state: runtime.ok ? "ok" : "broken",
    applied: runtime.ok ? 1 : 0,
    total: 1,
    pending: [],
    broken: runtime.ok ? [] : [{ id: "inject", status: "empty" }],
    detail: runtime,
  });
  const config = configLayer(dshHome, options);
  layers.push({
    title: "当前 profile 的权限选择",
    why: "界面层的最后一道门：即使补丁失效，这个组合也不会弹审批",
    kind: "config",
    ids: [],
    ok: config.ok,
    state: config.state,
    note: config.note,
    applied: config.ok ? 1 : 0,
    total: 1,
    pending: [],
    broken: config.state === "broken" ? [{ id: "preset", status: `${config.preset}/${config.approval}` }] : [],
    detail: config,
  });
  layers.push(hostLayoutLayer(host, options.reader || diskFs()));

  const byKind = (kind) => layers.filter((layer) => layer.kind === kind && layer.applicable !== false);
  const summarize = (list) => ({
    ok: list.every((layer) => layer.ok),
    passed: list.filter((layer) => layer.ok).length,
    total: list.length,
  });
  const baseSummary = {
    host: summarize(byKind("host")),
    runtime: summarize(byKind("runtime")),
    config: summarize(byKind("config")),
    layout: summarize(byKind("layout")),
    hook: summarize(byKind("hook")),
    override: summarize(byKind("override")),
  };
  const uncertain = layers.filter((layer) => ["unknown", "inferred"].includes(layer.state));
  const failed = layers.filter((layer) => !layer.ok);
  const pendingLayers = layers.filter((layer) => layer.state === "pending");
  const brokenLayers = layers.filter((layer) => layer.state === "broken");
  return {
    ok: failed.length === 0,
    state: brokenLayers.length ? "broken" : pendingLayers.length ? "pending" : uncertain.some((layer) => layer.state === "unknown") ? "unknown" : uncertain.length ? "inferred" : "ok",
    needsApply: brokenLayers.length === 0 && pendingLayers.length > 0,
    summary: {
      ...baseSummary,
      pending: { layers: pendingLayers.length, patches: pendingLayers.reduce((n, l) => n + l.pending.length, 0) },
      uncertain: { layers: uncertain.length },
      broken: { layers: brokenLayers.length },
    },
    host,
    host_version: compat.host_version,
    qualified: compat.qualified,
    level: compat.level,
    patch: tallyPatchStatus(status, services.ALL_PATCHES),
    layers,
    hints: failed.map((layer) => ({
      title: layer.title,
      action: layer.kind === "config"
        ? (config.error || config.note)
        : layer.kind === "layout"
          ? (layer.detail?.asar_still_sealed === true
            ? "目标磁盘仍有 app.asar；运行 host-status 核对当前服务入口，磁盘状态不代表已加载，需要重启时由用户操作"
            : "无法确定当前目标实例的运行方式；请明确 DSH_BASE 或 PURGE_DSH_CLI，不扫描其他安装")
          : layer.kind === "runtime"
            ? "写入 prompt-inject.md 或在插件设置里保存一次提示词"
            : layer.status_error
              ? `读取补丁状态失败：${layer.status_error}；先解决这个报错，别据此重装或改权限`
              : layer.state === "unknown"
                ? (layer.note || "未定位当前宿主；请明确当前实例的 DSH_BASE 或 PURGE_DSH_CLI，不需要据此重装或改权限")
                : `运行 ungate diagnose 看 #${layer.ids.join("/#")} 的锚点`,
    })),
  };
}

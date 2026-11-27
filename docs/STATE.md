# 当前状态（0.2.9）

> 当前版本 **0.2.9**。27 条宿主补丁 / 20 层自检。 · 最后更新：2026-11-26
> 只写现在是什么；历史在 [release-notes.md](../release-notes.md)。

## 这是什么

`dsh-ungate`：给 DSH 解除审批、沙箱与拒绝倾向拦截的附加组件。宿主补丁 + 运行时注入 + 强化段 + 权限配置 + `unrestricted` 预设，五层叠加。安装、应用、加载是三个不同阶段，任何"已生效"的结论都必须来自重开后的 `selfcheck` 与探针。

## 补丁表（27 条定义）

web 面（`--profile web`）实测：**21 条已应用**、**6 条不适用**（`optional` 且目标文件在 web 宿主里不存在）。桌面换包/关窗那组只在 Desktop 宿主上有目标。

| id | 名称 | 层 | web 面 |
| --- | --- | --- | --- |
| 25 | HARNESS_IDENTITY_STRIP | 提示词 | 应用 |
| 29 | TOOL_WEB_UNTRUSTED_NEUTRAL | 工具 | 应用 |
| 33 | TOOL_SHELL_DENIAL_PROMPT | 提示词 | 应用 |
| 36 | TOOL_FS_ESCALATION_SCHEMA | 提示词 | 应用 |
| 37 | SUBAGENT_SCOPE_LOCK_NEUTRAL | 提示词 | 应用 |
| 40 | COMPLETE_PROMPT_KEEP_INJECT | 兼容 | 应用 |
| 42 | SETTINGS_LEGACY_API | 代码 | 应用 |
| 45 | OFFICIAL_DESKTOP_UPDATE_HANDOFF | 代码 | 不适用 |
| 46 | OFFICIAL_DESKTOP_UPDATE_ASCII | 代码 | 不适用 |
| 48 | TOOL_SHELL_DELETE_MOVE_NEUTRAL | 工具 | 应用 |
| 55 | SYSTEM_PROMPT_REPLACE_HEAD | 代码 | 应用 |
| 57 | DEEPSEEK_SYSTEM_ROLE | 代码 | 应用 |
| 61 | OFFICIAL_SANDBOX_POLICY_NEUTRAL | 提示词 | 应用 |
| 66 | SYSTEM_PROMPT_RENDER_GUARD | 代码 | 应用 |
| 67 | AGENT_LOOP_MESSAGES_GUARD | 代码 | 应用 |
| 68 | SYSTEM_NODES_CONTENT_GUARD | 代码 | 应用 |
| 69 | MODEL_STREAM_RELEASE | 代码 | 应用 |
| 72 | MESSAGES_SYSTEM_CURRENT | 代码 | 应用 |
| 74 | ASSEMBLE_BEFORE_PRESTEP | 代码 | 应用 |
| 82 | DESKTOP_SHELL_PROFILE_FALLBACK | 代码 | 不适用 |
| 83 | DESKTOP_HOST_CLOSE_NO_FATAL | 代码 | 不适用 |
| 84 | DESKTOP_HOST_CLOSE_CODE0_NO_FAIL | 代码 | 不适用 |
| 90 | RESTORE_NATIVE_STEERING | 代码 | 应用 |
| 91 | BROWSER_COOKIE_NAME_IGNORE_PORT | 代码 | 应用 |
| 92 | HOST_MAX_HTTP_HEADER_SIZE | 代码 | 不适用（仅桌面壳） |
| 93 | SANDBOX_POLICY_BRAND_NEUTRAL | 提示词 | 应用 |
| 94 | SKILL_BADGE_DESCRIPTION_NEUTRAL | 提示词 | 应用 |

- 定义在 `lib/core.js` 的 `ALL_PATCHES`；`optional: true` 表示目标缺席时记"不适用"而不是失败。
- 默认关闭的可选补丁：**无**。`ungate patches list` 返回空清单。
- 逐条锚点与真机回归在 `test/patch-anchors.test.mjs`；宿主升级后的漂移用 `ungate diagnose` 定位、`ungate reanchor` 修复。

## 自检：20 层

`ungate selfcheck` 报告 20 层；web 面适用 19 层（宿主磁盘布局层在桌面壳才有）。未指定实例时大部分是 `unknown`。语义：

- `ok` 已确认 / `pending` 待应用 / `inferred`、`unknown` 证据不足（黄）/ `broken` 确认故障（退出码 1）。
- 面板写「19 层全部在位」是因为它在 web 面显示适用层数；命令行报告原始 20 层。两个数字都对，粒度不同。

## 已知限制

- **0.2.2 只在 web 面验证**：rc.1 上 apply 20 应用 + #90 已原生 + 6 不适用、零 failed，重启后 selfcheck 19 ok + 1 不适用、21/21 补丁、零漂移。rc.5（当前 npm `latest`）上 27 条补丁 id 全部解析：21 条锚点命中待应用、6 条桌面专属不适用，`missing_file` 与 `drifted` 均为 0——补丁表本身可直接应用；写盘需要可写宿主副本，`/usr/lib/node_modules` 这类系统目录会以「Host backup failed」中止。桌面壳六条（#45/#46/#82/#83/#84/#92）未验。
- **没有在线更新**：0.2.2 起后端 update 链整体退役（`lib/update*.js` 与 `/dsh-purge/update` 路由删除），`GET /dsh-purge/status` 不再有 `update` 字段。升级只走插件市场或手动安装；快照与回滚只走 CLI。
- **裸跑 `ungate selfcheck` 只会得到 `unknown`**：没有 `DSH_HOME` / `PURGE_DSH_CLI` 就找不到宿主。先指定实例。
- **桌面换包真机覆盖有限**：Linux 侧走过完整流程；Windows/macOS 依赖 Electron 版本，交接受单测覆盖但不等于实机验收。
- **rc.4 / 0.2.2-alpha.2 未验证**：允许应用，`selfcheck` 会标未验证。

## 没有的功能

| 功能 | 原因 | 替代 |
| --- | --- | --- |
| 在线检查更新 / 自动升级 | 升级由宿主插件市场负责，插件不自更新 | 市场升级或重装 tgz；快照与回滚走 `ungate backup` / `ungate rollback <id>` |
| 可选补丁开关 | 对应注入面已缩减，可选项不再存在 | `ungate patches list` 返回空清单 |
| 工具面与调试台 | 本发行版只做宿主解闸 | `presets/` 只有 `unrestricted` |

## 状态落在哪

| 路径 | 内容 |
| --- | --- |
| `$DSH_HOME/prompt-inject.md` | 用户的注入正文（插件只读） |
| `$DSH_HOME/dsh-purge/tuning.json` | boost、injectPosition、askNoBlock、refusalRetry、identityPrecedence、extraPatches |
| `$DSH_HOME/dsh-purge/probe.json` | 运行时探针（30 分钟 TTL） |
| `$DSH_HOME/dsh-purge/anchor-overrides.json` | 本机重锚覆盖 |
| `$DSH_HOME/dsh-purge/applied.json` · `installed-rev` | 上次应用的插件版本 |
| `$DSH_HOME/dsh-purge-minimal/audit.jsonl` | 动作审计（1MB 轮转，保留 2 份） |
| `$DSH_HOME/dsh-purge-minimal/backups/` | 快照与对象（`manifest.json` + `objects/`） |
| `$DSH_HOME/dsh-purge-minimal/` | 数据目录，**沿用历史目录名、不随包改名、不做任何迁移**：项目不读写用户 home 的结构 |
| `$DSH_HOME/.agent-presets/unrestricted/` | 无限制模式预设 |

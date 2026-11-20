# 0.2.5

> 2026-11-20 · `dsh-ungate` 0.2.5

补丁表（27 条）与自检层（20 层）不变；这版把宿主兼容推到当前 npm `latest`，并修掉一处会吃掉用户提示词正文的写入路径。0.2.4 从未发布到 npm（registry 上只有 `0.2.2`），所以从 npm 升级的路径是 `0.2.2 → 0.2.5`。

## 变更

- **支持 DSH Desktop 0.2.2-rc.5**（`@deepseek-ai/dsh` 当前 `latest` / `next`）：`QUALIFIED_HOST_VERSIONS` 与 `dshReleases` 加入 rc.5。实测：27 条补丁 id 全部解析——21 条锚点命中并写入、6 条桌面专属不适用，`missing_file 0`、`drifted 0`；重开后面板自检 `state=ok`、`level=qualified`。
- **修掉提示词正文被默认文本覆盖**：`POST /dsh-purge/override` 原先无条件接受客户端正文，面板「恢复默认」或一个陈旧客户端重连后的自动保存都会把用户的 `prompt-inject.md` 换成出厂默认。现在 `lib/core.js` 的 `overrideWriteWouldClobber()` 会在「磁盘上是用户正文 + 提交内容等于出厂默认」时拦截，接口返回 `409 reset_requires_confirm`，只有显式带 `reset: true` 才写。面板的恢复按钮已改为带上这个标记，保存路径对 409 给专门提示。
- **新增注入效果基准 `bench/`**：固定题库（10 题，6 道高拒域 + 4 道对照）、双臂 A/B、`pnpm run bench`，CI 走手动触发。注入正文在运行时从加密槽与 `BOOST_TEXT` 读取，不手抄副本。判定器把「空回 / 被 `function_call` 截断」单列为测量失败，不再混进拒答。
- **出厂注入正文删修辞**：1403 → 1272 字符，去掉没有可判定标准的句子与中英重复回声，可执行规则一字未动；`lib/asset-table.js` 重新 seal。
- **中英对照改为分节记录**：`scripts/i18n-pairing.mjs` + `README.i18n.yaml` 按节记哈希，代码块逐字比对、链接目标逐条比对；只改一侧直接失败，`--write` 也只接受两侧同时变更的节。取代原先「比行数」的结构比对。
- **文档继续做减法**：`packages/purge-panel/README.md` 从 51 行缩到 9 行、`NOTICE.md` 去掉内部账本与套话、`docs/STATE.md` 的本机实例信息移进 `docs/maintainer/`；CI 的打包断言改为白名单（不只看有没有残留归档）。
- **修正安装文档的版本事实**：0.2.4 未发布到 npm，README 的 npm 一段改回真实存在的版本，并说明 0.2.5 起 npm 与 tgz 两条路都能用。

## 验证

- `node scripts/check-docs.mjs`：`✓ 文档一致：0.2.5 · 补丁 27 条 · 已验证宿主 0.2.1-rc.1 / 0.2.1-rc.2 / 0.2.1-rc.3 / 0.2.1-rc.5 / 0.2.2-rc.1 / 0.2.2-rc.5`。
- `pnpm test` 449 项、0 失败；`pnpm run smoke`、面板双 bundle 校验通过。
- 0.2.2-rc.5 真机（npm CLI 宿主）：`ungate apply` 写入 21 条、6 条 `na`、零失败，重启 `dsh-web` 后面板状态 `applied 21 / pending 0 / na 6 / lost false`，自检 `state=ok`、`broken` 为空。

# 0.2.4

> 2026-11-09 · `dsh-ungate` 0.2.4

只改文档与入口命名，补丁表（27 条）、注入装配与自检层（20 层）均无变化；已装 0.2.3 的用户不需要为行为升级。

## 变更

- **CLI 主名改为 `ungate`**：与包名对齐（此前 `purge` 是上游项目的标记）。`purge`、`dsh-purge` 保留为同一入口的兼容别名，已写进脚本的调用不会断。插件 id 仍是 `dsh-purge`，数据目录仍是 `$DSH_HOME/dsh-purge-minimal/`，面板 HTTP 前缀仍是 `/dsh-purge/`，聊天斜杠命令仍是 `/purge`——这些都没动，已有配置与状态不受影响。
- **新增 [docs/CLI.md](docs/CLI.md)**：全部命令、退出码、探针用法、环境变量、旧名兼容说明，从 README 移出。
- **README 重写**：首屏改成一句可判断的话（去掉哪几类限制）+ 四条收益，删掉"它改变什么"对照表与长篇机制说明；命令表收成 4 行并指向 CLI 文档；来源与许可合并到文末。
- **AGENTS.md 收窄为本仓库的开发约定**（约 60 行）：改补丁的五条规矩、不变量、测试与构建、发版清单。原来的 514 行是上游 1.6.x 的 agent 使用手册，其中"补丁数 73/76""红队工具需 Node ≥22.5""`purge patches enable 18,19`"等描述与本发行版不符。同时从 `package.json` 的 `files` 里去掉——DSH 只读 `$DSH_HOME/AGENTS.md` 和工作区根，打进 npm 包没有任何 agent 会读。
- 修正两处不成立的声明：README/AGENTS 曾称本发行版去掉"计划模式硬拦"与"工具结果修剪"，实际全仓没有相关补丁（`targetFiles()` 里 `compaction-tool-result-pruner` 是上游 opt-in #19 留下的死键）。改为"不在本发行版的处理范围内"。
- **删掉对外文档里的维护者材料**：`docs/VERIFY.md`（逐环节验收记录、临时路径、sha256、边界声明）与 `skills/pentest-sop.md`（演练台残留的评分纪律）不再随包发布，证据合并进本文件与 `test/patch-anchors.test.mjs`；顺带删掉指向已删除截图的死清单 `screenshots.json`。
- **收窄发行包内容**：`package.json files` 改为逐文件列举，只带用户文档（INSTALLATION / CLI / STATE / RUNBOOK / MAINTENANCE / README.en）、图片资产与许可证；`AGENTS.md`、`DESKTOP-TEST.md`、`preset-test.md` 留在仓库里给维护者看，不再进 tgz。
- **中英文档不再靠人盯**：`check:docs` 新增结构比对——中英 README 的章节层级、表格行数、代码块与列表长度必须逐块对齐，少一节或多一行都直接失败。
- **支持到 DSH Desktop 0.2.2-rc.5**（当前 `@deepseek-ai/dsh` 的 npm `latest`）：`QUALIFIED_HOST_VERSIONS` 与 `dshReleases` 加入 rc.5。实测口径见下面的验证段。
- **新增注入效果基准 `bench/`**：固定题库（10 题，6 道高拒域 + 4 道对照）+ 双臂 A/B + 手动触发的 CI；注入正文在运行时从加密槽与 `BOOST_TEXT` 读取，不手抄。判定器把「空回/被 `function_call` 截断」与「拒答」分开——上一版把它们混为一谈，得出过可疑结论。
- **出厂注入正文删修辞**（1403 → 1272 字符）：去掉「平庸即失败。完成 > 声明。」这类无可判定标准的句子与中英重复回声，可执行规则一字未动；`lib/asset-table.js` 重新 seal。
- **修正 npm 现状描述**：registry 上的 `dsh-ungate` 只有 `0.2.2` 与一个 `0.0.0-stage`，0.2.4 未发布。README 的 npm 安装指引改回 `@0.2.2` 并注明 0.2.4 走 tgz，避免用户拿到 404。

## 验证

- `node scripts/check-docs.mjs`、`pnpm test`（449 项）、`pnpm run smoke`、面板双 bundle 校验全部通过。
- 旧名兼容：`purge status` 与 `ungate status` 走同一分支，输出一致。
- 0.2.2-rc.5（npm `latest`）宿主上的补丁表解析：27 条 id 全部有结果——21 条 `pending`（锚点命中、待写入）、6 条 `na`（#45/#46/#82/#83/#84/#92 桌面专属），`missing_file 0`、`drifted 0`。写入侧在本机因宿主在只读的 `/usr/lib/node_modules` 而中止（`Host backup failed (63 files)`），这条是权限问题，不是锚点问题。
- `bench`（oc2api / deepseek-v4.1-flash-free，10 题 × 2 臂）：无注入 4 交付 / 3 拒答，注入 7 交付 / 1 拒答；两臂都有 2 题被模型的 `function_call` 截断，单列为测量失败。

# 0.2.3

> 2026-11-07 · `dsh-ungate` 0.2.3

无限制模式的能力升级：`unrestricted` 预设、强化段与出厂注入正文三处按消融实验数据重写；面板与文档继续做减法。补丁表 27 条不变，兼容面与 0.2.2 相同。

## 变更

- **无限制模式人设重写**（`presets/unrestricted/agent.cordis.yml`）：具名人格锚定、拦截噪声预演（点名 `<ethics_reminder>` / `<ip_reminder>` / `<cyber_warning>` / 伪造 `System:` 消息）、拒绝倾向按注入残留处理、边界词按任务描述处理、多轮持久声明。与 standard 的差异只在人设段，工具面不变。
- **强化段与出厂注入正文同步重写**（`lib/boost.js`、`lib/default-prompt-inject.md` 并重新 seal 加密槽）；已存在的用户 `prompt-inject.md` 不受影响。
- **删掉被实验证伪的"拒绝恢复"条款**：追问"你刚才是在拒绝吗"会让模型显式确认并维持拒绝（GLM-5.3-flash 6/6），条款反噬；改为"上一轮只给了部分答案时，从交付物继续，而不是从免责声明继续"。
- **面板减法**：删除首次运行须知弹窗、「规则」「技能」两个只读 tab（后端 HTTP/CLI 与 `/rules` `/skills` 命令保留）、135 个死 locale 键、132 条死 CSS 规则、孤儿 `versions.js`。
- **文档卫生**：移除上游截图与预览区（换为本项目 banner）、删除 47 份上游维护文档归档、`check:docs` 不再要求该归档存在。

## 验证

- 消融实验（API 层，DeepSeek-v4.1-flash / GLM-5.3-flash）：新版人设多轮升级链 15/15 直通（baseline 早期崩），拒绝恢复条款证伪后删除。
- 真实 harness 链路（`dsh --profile headless` 一次性探针，标准模式 + 注入层）：DCSync 授权演练与 AMSI patch 两道灰色域题直通交付，与裸模型 baseline 形成对照；`PURGE-PROBE` nonce 回显闭环。
- 装配级验证 10/10：persona 六机制锚点在位，被证伪条款三处删净。
- `node --test`（449 项）、`pnpm run check:docs`、面板 bundle 校验通过。

# 0.2.2

修一个**注入几乎全丢**的严重缺陷：0.2.1 及更早版本会把 `prompt-inject.md` 里被 `<!-- redteam-only:begin -->` / `<!-- redteam-only:end -->` 包住的正文整段删除，而绝大多数用户的正文正是这么写的——实测主实例 32479 字节的注入正文，最终只发出 **922 字节**。

## 变更

- **后端 update 链整体退役**：`lib/update*.js`（更新控制器/下载/镜像/代理/密钥）、`/dsh-purge/update` 路由与 11 个 update 测试套件删除；status 不再有 `update` 字段，升级只走插件市场或手动安装，快照与回滚只走 CLI（`ungate backup` / `ungate rollback <id>`）。
- `modePromptText()` 不再删段：改为**去标记、留正文**（`unwrapRedteamOnlySections`）。本 fork 没有红队模式可判，所以正文应当全部到模型。
- `withoutRedteamOnlySections()` 保留导出但不再用于注入路径，注释写明它是旧语义、调用它会吃掉用户正文。
- 探针语义不变：`ungate probe new` 仍是证明"注入到达模型"的手段；这次修的正是它此前查不出的那一类。

## 验证

- 主实例（home `/home/kali/.dsh`）：`[inject.read]` 由 `rawBytes=32448 outBytes=922` 变为 **`outBytes=32371`**。
- 模型侧取证（`DSH_HOME=/home/kali/.dsh-iso`，`dsh --profile headless` 真调用）：要求复述正文第 20000 字节处的英文原句，模型逐字返回 `Progress status lines are body text rendered in the UI in real time; …`。
- `node --test`（449 项）与 `pnpm run check:docs` 通过；`pnpm run test:ui` 与面板 bundle 校验通过。

# 0.2.1

> 2026-11-07 · `dsh-ungate` 0.2.1（原 `dsh-purge-minimal`）

这是一次**身份变更**，功能仍然是那 27 条补丁与 20 层自检。改名原因：原名不指向任何具体功能，不适合作为独立发行版的发行身份。

## 变更

- 包名 `dsh-purge-minimal` → `dsh-ungate`；仓库更名为 `youki258/dsh-ungate`（GitHub 旧链会自动跳转）。
- 插件在 `cordis.patch.yml` 里的 id 仍是 `dsh-purge`：已装用户的配置、提示词、规则、`$DSH_HOME/dsh-purge/*` 全部不动。
- 数据目录保持 `$DSH_HOME/dsh-purge-minimal/`：包名变了但目录名不变，**不做任何自动迁移**——项目不写用户 home 的目录结构。
- 兼容读取：`dsh-purge-minimal` 仍被安装识别、回滚依赖名与卸载清理逻辑接受，方便旧安装平滑升级。
- **撤回 0.2.0**：那一版曾内置数据目录自动改名（`$DSH_HOME/dsh-ungate/`），已删除并从发行页撤下——用户的 home 目录结构不属于发行版该动的东西。
- 面板标题从 `Purge` 改为 `Ungate`；命令行 `purge` 不变。
- 发行包排除 `docs/upstream/`（实测 1.1M / 170 文件，上游归档命中 0）。

## 验证

- `pnpm test`：533 项，0 失败（509 通过 / 24 跳过）。
- `pnpm run check:docs`：通过。
- 面板 bundle 校验、打包内容断言（`.github/workflows/ci.yml` 同款）。

## 升级路径

桌面/Web 面板里装旧版 → 换新 tgz 或 npm 包 → 点「应用」→ 退出重开 → `selfcheck`。数据目录（`$DSH_HOME/dsh-purge-minimal/`）原地沿用，不会移动或改名。

# 0.1.3

> 2026-11-07 · `dsh-ungate` 0.1.3 · 已实测宿主不变：DSH Desktop 0.2.1-rc.1 / rc.2 / rc.3 / rc.5，0.2.2-rc.1 仅 web / npm CLI 面

这一版对齐 DSH 官方插件规范，并把 README 重写成本发行版自己的叙事。

## 变更

- `package.json` 补官方字段：`engines.dsh`（宿主安装与启动时的版本门禁）、`dsh.manifestVersion: 1`、`dsh.bundle.listedByDefault: true`。此前只有 `@deepseek-ai/cordis` peer，而宿主不计入该 peer，等于没有版本约束。
- `engines.dsh` 取值 `>=0.2.1-rc.1 <0.3.0 || >=0.2.2-rc.1 <0.3.0`：第二段是为了让 0.2.2 的预发布版本参与匹配（SemVer 预发布按三元组对齐）；未验证版本仍可用宿主的 `allow-version --accept-risk` 豁免。
- README 重写：首屏来源声明、五层模型、30 秒上手、兼容矩阵、更新策略（交给宿主）、文档地图。`README.zh-CN.md` 与英文 README 同步。
- 新增 `docs/VERIFY.md`：0.2.2-rc.1 web 面的逐环节证据与边界说明。
- 发行包链接从 `/releases/latest/download/` 固定文件名改为 `/releases/download/v0.1.3/` 版本化路径。

## 验证

- `pnpm test`：533 项，0 失败（509 通过 / 24 跳过）。
- `pnpm run check:docs`：通过（版本、兼容声明、补丁条数、残留引用、安装示例）。
- `node packages/purge-panel/scripts/build.mjs --community --check`：bundle 与源码一致。

## 已知限制

- 桌面壳 0.2.2-rc.1 的换包流程未验证；web 面已跑通安装→应用→重启→自检。
- tgz 手工安装的副本在插件管理器中不可自动更新，升级需换新 tgz。

# 0.1.2

> 2026-11-06 · 主干：`dsh-ungate` 0.1.2 · 已实测 DSH Desktop 0.2.1-rc.1 / rc.2 / rc.3 / rc.5

这一版只做减法与收敛：把上一轮 fork 留下的半成品删干净，让代码、面板、文档说的是同一件事。

## 移除

- **hooks 否决旁路整条线**：`lib/hooks-deny.js`、`/dsh-purge/hooks-deny` 接口、面板「高级选项」区块、`hooks_deny_bypass` 状态字段、`tuning` 里的开关、以及状态里那 4 个幽灵补丁 id（30/31/64/65）。此前文档声称与代码行为不一致，本次起两边一致：四条幽灵补丁 id 彻底移除。
- **演练台（drill）残留**：`lib/drill-grant.js`、`/dsh-purge/drill-grant` 路由、卸载流程里的清理分支、面板欢迎语里的"演练台"、预览截图与 `screenshots.json` 条目。
- **面板与后台的在线更新**：`检查更新` / `自动检查` / 更新通道对话框 / 定时检查全部移除。面板「维护」只剩本机快照、回滚、最近动作与发行记录，并明确写清"升级走插件市场"。原因见 [docs/STATE.md](docs/STATE.md#已知限制)：本 fork 没有可安装的在线源，保留一个永远失败的按钮只会让状态页常年见红。
- **上游历史资料出仓面**：`docs/releases/1.6.x`、上游维护说明与 DSH Store 文档归档到 `docs/upstream/`，不再混在当前文档里。
- 仓库根目录的 `audit.jsonl`、`backups/`、`objects/`、`pkgs/` 历史产物（D15 迁移前遗留，且已被 gitignore）。

## 变更

- `PATCH_DISPLAY_GROUPS` 只保留仍存在的死分组：`desktop_update [45,46]`、`desktop_close [83,84]`；状态里的补丁总数重新对得上（27 条定义，web 面 21 应用 + 6 不适用）。
- `scripts/bootstrap-install.mjs`：只有**没有显式 home** 时才继承 `DSH_PROFILE`。此前从任意 DSH 会话里跑测试，当前 profile 会泄漏进 fixture，导致 3 项误报 `Profile is not initialized`。
- `scripts/smoke.mjs`：npm 缺席时回退 pnpm；`cordis.patch.yml` 的校验不再要求已删除的条目。
- `package.json`：`description` 改成本发行版真实定位；`install.tarball` 指向固定版本 `releases/download/v0.1.2/...`（原先钉在 `/latest/` 下的固定文件名，永远解析不到新包）；去掉 `cordis.patch.yml` 里已失效的 `hooksDenyBypass`。
- 预设 `unrestricted`：去掉对补丁 `#76` / `#24` 的引用（这两条早已不存在），改为描述当前由 profile `system-prompt` 配置承担的语义。
- 文档收敛：README / AGENTS / INSTALLATION / MAINTENANCE / RUNBOOK / STATE / 英文 README 全部重写为 0.1.2 单一真相。`check-docs` 同时校验版本、兼容声明、发行包链接，并拦截上游 1.6.x 与已删除功能的死引用。

## 验证

- `pnpm test`：533 项，508 通过 / 24 跳过 / 0 失败（干净环境；从 DSH 会话里直接跑也不再受 profile 泄漏影响）。
- `pnpm run smoke`：打包 → 解包 → 无依赖启动 CLI → 导入 → 预设解析 → status，全部通过。
- `pnpm run check:docs`：通过。
- 面板 `node packages/purge-panel/scripts/build.mjs --community --check`：bundle 与源码一致。
- 本机实例（DSH 0.2.1-rc.3，web 面）：21/21 应用、6 不适用、`broken` 为空。

## 已知问题

- 0.2.2-rc.1 的实测结论尚未写进兼容表（见 [docs/STATE.md](docs/STATE.md#已知限制)）；在补齐前不要对外声称支持。
- 桌面换包（密封归档 → 解包）的真机验收只在 Linux 侧做过，Windows/macOS 交接受测试覆盖但与具体 Electron 版本强相关。

---

# 0.1.1

- 仓库迁到 [youki258/dsh-ungate](https://github.com/youki258/dsh-ungate)，插件身份与安装链接随之更新。
- 补丁表从社区版的 48 条压到 27 条：去掉渗透工具面、演练台与在线自更新相关的全部补丁与运行时。

# 0.1.0

- 从 [kingcharleslzy-ai/dsh-purge](https://github.com/kingcharleslzy-ai/dsh-purge) 的 minimal 分支切出首个独立发行版（原始项目：[YuJunZhiXue/dsh-purge](https://github.com/YuJunZhiXue/dsh-purge)）。

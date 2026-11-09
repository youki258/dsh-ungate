# 安装与升级（0.2.4）

> 当前版本 **0.2.4**。安装不应用补丁、不重启 DSH；应用与加载是另外两步，见文末「装完必做」。

## 0. 先确认你面对的是哪个实例

```sh
command -v dsh          # 入口在哪
dsh --version           # 或读 profile 里的 package.json
echo "$DSH_HOME"        # 数据目录
```

- Desktop 版 profile 默认叫 `desktop`，独立 `dsh`（CLI/Web）默认 `web`。名字以本机实际目录为准：`$DSH_HOME/profiles/<名称>/package.json` 必须存在。
- 没初始化的 home 不要装：先打开一次 DSH，让它建 profile。

## 1. 三种入口

### 1.1 DSH 插件市场 / 官方插件界面（推荐）

本仓库的 Releases 提供固定版本包。市场里搜 `dsh-ungate`，或直接用 CLI：

```sh
dsh plugin --profile web add https://github.com/youki258/dsh-ungate/releases/download/v0.2.4/dsh-ungate-0.2.4.tgz
```

Desktop：把 `web` 换成 `desktop`。官方插件管理器维护 `dsh.bundle`；装完它会出现在左侧栏「Ungate」。

### 1.2 社区引导安装器

Linux / macOS：

```sh
curl -fsSLO https://raw.githubusercontent.com/youki258/dsh-ungate/master/scripts/install.sh
sh install.sh --dry-run     # 只验证前置条件、下载与 SHA256
sh install.sh               # 正式安装：备份、调用官方 CLI、迁移旧包引用、验证磁盘版本
```

可显式指定：`DSH_NODE` / `PURGE_DSH_CLI` / `DSH_HOME` / `--profile=名称` / `--version=0.2.4`。

Windows（PowerShell 5.1+）：

```powershell
Invoke-WebRequest -UseBasicParsing https://raw.githubusercontent.com/youki258/dsh-ungate/master/scripts/install.ps1 -OutFile install.ps1
.\install.ps1 -DryRun
.\install.ps1
```

安装器会：下载发行 tgz → 校验 SHA256 → 在目标 profile 里执行官方 `add` → 迁移已知旧包引用 → 验证磁盘版本与入口。失败时保留快照，用 `ungate rollback <id>` 恢复。它**不会**自动 apply 或重启 DSH。

系统 npm 宿主只读时，Linux 安装器会准备用户副本，迁移成功后才激活 `~/.local/bin/dsh`；失败保留原入口。

### 1.3 手工

```sh
cd "$DSH_HOME/profiles/web"
pnpm add /path/to/dsh-ungate-0.2.1.tgz
```

然后把本包 `cordis.patch.yml` 里的 `dsh-purge` 与 `dsh-purge-presets` 两条 insert 合并进 profile 的 `cordis.yml`（不要整份覆盖），再重启服务。

## 2. 装完必做

1. 打开左侧栏 **Ungate → 状态**，点「应用」。它会备份宿主、写 27 条补丁中的适用项，并创建快照。
2. **完全退出 DSH 再打开**。Desktop：⌘Q / 托盘退出，不是关窗口；Web：重启服务进程。
3. 核对：

```sh
ungate selfcheck --json      # layers[].state：pending=待应用，broken=故障
ungate probe new             # 发一句话看模型是否原样回显 nonce
```

4. 想要 `unrestricted` 预设：`ungate preset install`，然后新会话下拉里选「无限制模式」。

## 3. 密封归档（Desktop 首次应用）

Desktop 宿主首次「应用」时，`app.asar` 可能仍封着，插件会把补丁写进解包副本并安排换包助手：

- 面板/`host-status` 显示 `asar_handoff.phase`：`waiting_for_quit` 表示助手就绪，**不代表已加载**；`complete` 才是换包完成。
- 期间请从托盘完整退出，之后手动打开。失败时看同目录的 `resources/app.asar.purge-handoff.json` 与 `.log`；`.rename-pending` 不是成功。
- 归档备份为 `app.asar.purge-<token>.bak`，独立于 profile 快照。

## 4. 升级

- **插件升级**：换 tgz 重装（或市场升级）→ 点「应用」→ 退出重开 → `selfcheck`。旧版本的补丁标记会被识别，重复应用是幂等的。
- **宿主升级后**：`asar_still_sealed` 会变 true、旧补丁全部失效。点「应用」→ 退出重开即可；若某条补丁锚点漂移，`ungate diagnose` 会给文件、行号与候选片段，用 `ungate reanchor apply <id> --lines A-B --yes` 钉住。
- 升级不会动 `prompt-inject.md`、规则与其他插件配置。

## 5. 回滚与卸载

```sh
ungate rollback <id>     # 回滚插件本体（走 tgz 安装，恢复依赖图与清单）
ungate usage             # 看快照占用
ungate prune             # 清理+GC
ungate uninstall         # 卸载插件，清理本 home 内的插件目录与链接
```

- 只想撤补丁：面板「还原」或 `ungate revert`。它按快照还原宿主文件，不碰用户内容。
- 卸载不会删除 `prompt-inject.md`、规则、审计与快照；需要彻底清理时手动删 `$DSH_HOME/dsh-purge*`。

## 6. 常见失败

| 现象 | 判读 | 动作 |
| --- | --- | --- |
| `Profile is not initialized` | 目标 home/profile 没初始化，或脚本传了别的 home | 先打开一次 DSH，确认 profile 目录有 `package.json` |
| `ERR_PNPM_MINIMUM_RELEASE_AGE_VIOLATION` | 依赖太新被拦；若同时报 `version not present in registry manifest` 则是公开镜像元数据不全 | 安装器会对明确的公开镜像做一次 scoped registry 重试；仍失败就保留日志，不要关 `minimumReleaseAge` |
| `fetch failed` / `UND_ERR_DESTROYED` | 下载阶段问题，不等于包没上传 | 看 `[download]` 三段（metadata / archive / checksum）与底层错误码；瞬时 408/429/5xx 最多两次 |
| `Cannot find package 'dsh-ungate'` | 入口找到了但依赖没装好，或 profile 里存在重复入口 | 检查 `profiles/<名>/node_modules/dsh-ungate`、bundle 条目与实际 manifest；不要盲删配置 |
| 应用后模型仍推脱 | 插件链路问题还是模型层问题分不清 | 先 `ungate probe new`：回显=注入到位，改人设/强化段；不回显=查注入层 |
| `读取失败: timeout` | 单次请求超时，不代表宿主缺失 | 刷新；持续失败再收集版本与脱敏错误 |

安装器测试通过不等于模型行为验收通过；组件测试通过不等于完整 GUI 通过。报告问题时分开写。

## 7. 测试与验收边界

- `pnpm test`：449 项，干净环境 0 失败；从 DSH 会话里跑也成立（安装器不再继承会话 profile）。
- `pnpm run smoke`：打包 → 解包 → 无依赖启动 → 导入 → 预设解析。
- 真机验收（Electron / Windows 换包 / macOS 交接）使用隔离实例，不能拿 Node 单测冒充。

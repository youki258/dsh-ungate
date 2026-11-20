# CLI 参考

`ungate` 是 `bin/community.js` 的入口；没装进 PATH 时用 `node <插件目录>/bin/community.js`。裸 CLI 看不到实例信息，先显式指定 `DSH_HOME` 与 `PURGE_DSH_CLI`，否则自检只会报 `unknown`。

命令名只有 `ungate`：0.2.6 起 `purge`、`dsh-purge` 两个 bin 与 `bin/dsh-purge.js` 一并删除，宿主补丁面的动作（`apply`/`revert`/`uninstall`/`edit`）现在是同一份实现（`bin/host-commands.js`）。聊天里的斜杠命令仍是 `/purge`（命令名与包名无关）。

## 状态与证据

| 命令 | 作用 | 退出码 |
| --- | --- | --- |
| `ungate status` | 宿主路径、surface、补丁计数 | 0 |
| `ungate selfcheck [--json]` | 20 层逐层证据 | `broken` → 1 |
| `ungate host-status` / `host-check` | 只读磁盘布局与运行入口，不换包不重启 | 0，须读 `state` |
| `ungate diagnose [--json]` | 锚点漂移诊断（文件、行号、候选落点） | 0 |
| `ungate audit [--limit n]` | 最近动作记录（含 `refusal_retry`） | 0 |

自检状态语义：`ok` 已确认 / `pending` 待应用 / `inferred` 宿主推导 / `unknown` 证据不足 / `broken` 确认故障。`pending` 不是故障，点一次「应用」即可。

## 应用与回滚

| 命令 | 作用 |
| --- | --- |
| `ungate apply` | 写全部补丁（先备份、幂等） |
| `ungate revert` | 撤全部补丁（先备份） |
| `ungate uninstall` | 清理本 home 内的插件目录与链接 |
| `ungate backup` | 打快照 |
| `ungate prune` / `backup prune` | 清理旧快照与对象 |
| `ungate usage` / `backup usage` | 备份占用 |
| `ungate rollback <备份ID>` | 回滚插件到某个快照 |
| `ungate migrate <tgz>` | 从旧包迁移到当前发行包 |
| `ungate install <tgz>` | 用指定 tgz 安装/升级（自动备份） |

## 锚点

| 命令 | 作用 |
| --- | --- |
| `ungate reanchor list` | 列出本地重锚覆盖 |
| `ungate reanchor show <id>` | 看某条的覆盖内容 |
| `ungate reanchor apply <id> [--index n] [--lines a-b] [--yes]` | 钉新锚点（先 dry-run 看候选，加 `--yes` 写入） |
| `ungate reanchor clear <id>` | 撤销覆盖，回到出厂锚点 |

覆盖存在 `$DSH_HOME/dsh-purge/anchor-overrides.json`，升级插件不丢。

## 注入与预设

| 命令 | 作用 |
| --- | --- |
| `ungate probe [new]` | 生成/查看运行时探针（30 分钟 TTL） |
| `ungate boost [on\|off]` | 强化段开关 |
| `ungate inject head\|tail\|both` | 注入位置，下一轮生效 |
| `ungate retry [on\|off]` | 拒绝检测 + 单次重试（默认 off） |
| `ungate preset [status\|install [--force]]` | `unrestricted` 预设落盘 |
| `ungate rewind [on\|off]` | 会话里的回滚按钮开关（写 `tuning.json`，重启生效） |
| `ungate patches [list]` | 可选补丁清单（当前发行版没有 opt-in 补丁） |
| `ungate toggle` | 交互式开关 |
| `ungate edit` | 打开插件目录 |

## 探针怎么用

```sh
ungate probe new
# → {"nonce":"purge-1a2b3c4d","message":"请原样输出下面这行…[purge-1a2b3c4d]"}
```

发一句话让模型回显：回显 = 注入链路通；回显但仍在推脱 = 人设或强化段问题；不回显 = 注入没到（查注入层、`boost` 是否被关、`injectPosition`）。

## 环境变量

| 变量 | 作用 |
| --- | --- |
| `DSH_HOME` | 实例的 home 目录（默认 `~/.dsh`） |
| `DSH_BASE` | 显式指定插件安装根（宿主目录不可自动定位时） |
| `PURGE_DSH_CLI` | 显式指定宿主 CLI 入口 |
| `PURGE_PROFILE_DIR` | 显式指定 profile 目录 |
| `PURGE_BOOST_ORDER` | 覆盖强化段的 section order |
| `PURGE_DOWNLOAD_TIMEOUT_MS` | 安装器下载预算（默认 180000） |

面板与 CLI 走同一套实现，`GET /dsh-purge/status`、`/selfcheck`、`/community` 与写操作接口见 [MAINTENANCE](MAINTENANCE.md)。

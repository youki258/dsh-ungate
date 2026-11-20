# 运维手册（dsh-ungate 0.2.5）

> 当前版本 **0.2.5**。面向在本机维护插件的人：体检、改宿主、重启、隔离验证、出事怎么收。
> 前提：`DSH_HOME` 与 `DSH_PROFILE` 指向**你要操作的那个实例**，不是"这台机器上恰好跑着的那个"。

## 0. 一分钟体检

```sh
export DSH_HOME="$HOME/.dsh" DSH_PROFILE=web
export PURGE_DSH_CLI="$(command -v dsh)"
node /path/to/dsh-ungate/bin/community.js status
node /path/to/dsh-ungate/bin/community.js selfcheck --json | jq '{ok, state, patch, broken}'
node /path/to/dsh-ungate/bin/community.js audit --limit 20
```

判断顺序：`state` → `broken[]` → `patch.applied/total` → 最近审计里有没有 `refusal_retry`。

## 1. 日常动作

| 场景 | 动作 |
| --- | --- |
| DSH 官方升级后 | 面板「应用」→ 完整退出 → 重开 → `selfcheck`；有漂移先 `diagnose` |
| 插件升级后 | 同上（新补丁要重新写） |
| 模型开始推脱 | `ungate probe new` → 发一句话看回显 → 回显则调人设/强化段，不回显则查注入层 |
| 想临时关强化段 | `ungate boost off` → 重开；`boost on` 恢复 |
| 工具被追问审批 | `selfcheck` 看审批/沙箱层；绿则属工具自身限制，红则重新应用 |
| 要撤掉所有补丁 | 面板「还原」/ `ungate revert`，再重开 |
| 要回到旧插件版本 | `ungate rollback <id>` |

## 2. 重启 DSH 的安全做法

**不要在会话自己的 cgroup 里 `systemctl stop dsh-web`**——停掉的就是当前会话的宿主，之后没人能把服务拉回来。

用 transient unit 把重启动作放到会话之外：

```sh
sudo systemd-run --unit=dsh-web-restart --collect \
  /bin/sh -c 'systemctl restart dsh-web'
```

隔离实例同理，把 unit 名换成 `dsh-web-iso`。Desktop 用户不需要这条：手动完整退出再打开即可。

## 3. 改宿主类改动的流程

1. 先在**隔离实例**上做（独立 `DSH_HOME`、独立端口、独立 unit），绝不先动主实例。
2. 隔离实例里跑完整链路：装插件 → 应用 → 重启 → `selfcheck` → 探针 → **新建一个会话并打开一个历史会话**（`--dump-config` 不看模块出口，证明不了 preset 能实例化）。
3. 证据齐了再动主实例；主实例改完同样走「应用 → 退出 → 重开 → 自检」。
4. 每一步都留输出（`status`/`selfcheck --json`/`audit`），别只留一句"好了"。

### 3.1 升级宿主后的第一坑：profile preset 引了被删的子路径出口

**症状**：重启后每个会话都「不可用」，历史会话从侧栏消失（看着像数据丢了），前端 console 一串 `entries did not activate`。

**根因**：profile 的 `cordis.patch.yml` 里 preset 条目不只写包名，还写子路径出口，例如
`@deepseek-ai/dsh-tool-subagent-control/list-agents`。宿主 0.2.2 起把 `list_agents` 并回主入口、
删掉 `./list-agents` 出口 → 该 entry 永不 start → preset 判 invalid → 会话 create/restore 全失败。
会话数据没坏，坏的是配置里那条引用。

**处置**：

1. 先备份：`cp cordis.patch.yml cordis.patch.yml.bak-listagents-$(date +%s)`。
2. 删除失效条目的 `id` 与 `name` 两行（连带 `disabled` 行）。
3. **不要**把它改成指主入口——主入口已经带这个工具，再指一次会重复注册同名工具。
4. 重启（见 §2），`curl -o /dev/null -w '%{http_code}' localhost:3080/` 得 401 即服务起来了。
5. 验收看行为，不看日志措辞：新建会话正常、打开历史会话不丢、console 无 agent-preset 报错。

本 fork 的 `lib/preset-compat.js:adaptListAgents` 已在注册期处理这条：只要「子路径不可解析 + 宿主版本 ≥ 0.2.2」，就摘掉自带 `unrestricted` 预设里的那一行（判定按版本而非写死 rc 号，rc.2/0.3 不会再犯）。**用户自己复制出去的预设、或别的 profile 里的旧条目仍需人工清。**

## 4. 隔离实例速查

```sh
# 起
sudo systemd-run --unit=dsh-web-iso --collect \
  env DSH_HOME="$HOME/.dsh-iso" /usr/bin/node <host>/lib/bin.js \
  --profile web --port 3081 --no-open --trusted-host 127.0.0.1 --trusted-host 127.0.0.1:3081
# 看
systemctl status dsh-web-iso --no-pager
journalctl -u dsh-web-iso -n 50 --no-pager
```

token 从该实例的启动日志里取，不要复用主实例的。

## 5. 出事怎么收

| 现象 | 先做 | 再决定 |
| --- | --- | --- |
| 应用后启动报错 | 读 `selfcheck` 的 `broken` 与 `apply` 的 `failed`；看宿主源码是否被写坏 | 面板「还原」或 `ungate revert`，重开验证 |
| 换包后起不来 | 看 `resources/app.asar.purge-handoff.json` / `.log`，`asar_handoff.phase` | 用 `app.asar.purge-<token>.bak` 恢复归档，再重新应用 |
| 面板报错但 CLI 正常 | 前端 bundle 与后端版本不一致 | 重装插件（同一个 tgz），刷新页面 |
| 审计里连续 `refusal_retry` | 注入到了但模型仍在拒 | 调强化段/人设/`injectPosition`，别改补丁 |
| 插件目录被删/依赖坏了 | `ungate usage` 看快照，`ungate rollback <id>` | 仍不行就卸干净重装，保留用户内容 |

收集信息时给：插件版本、宿主版本、surface（web/desktop）、`selfcheck` 的 `broken`、脱敏后的错误行。**不要**贴 token、提示词正文、完整 profile 配置。

## 6. 备份与清理

- 快照由「应用」「备份」自动创建；`ungate usage` 看占用，`ungate prune` 清理并 GC。
- 审计 1MB 轮转、保留 2 份；需要长期保留就自己归档 `audit.jsonl`。
- 卸载（`ungate uninstall`）只清插件目录与链接；`$DSH_HOME/dsh-purge*` 里的状态要手动删。

## 7. 验证到哪一层

| 手段 | 能证明什么 |
| --- | --- |
| `pnpm test` / `smoke` / 面板契约 | 代码与打包正确 |
| `apply` 退出 0 + `selfcheck` | 磁盘写成功 |
| 重启后 `selfcheck` + `probe` 回显 | 当前进程真的加载并注入 |

宿主升级后必须走到第三行：磁盘写成功不代表进程已加载。

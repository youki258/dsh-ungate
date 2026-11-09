# 维护手册（0.2.4）

> 当前版本 **0.2.4**。面向维护这个插件本体的人：改补丁、修锚点、看审计、发版。

## 1. 应用与还原

- 「应用」= 备份宿主目标文件 → 写 `replacements` → 写 `applied.json` → 建快照。幂等，随时可重复。
- 「还原」= 按快照还原宿主文件；不动 `prompt-inject.md`、规则、其他插件配置。
- 两条路径共用 `lib/core.js` 的 `applyPatchesAllHosts`，CLI 与面板没有第二套实现。
- 失败语义：`failed` 里逐条列出 patch id 与原因（`pattern_not_found`、`hitMismatch`、写失败）。**退出码 0 不代表全部成功**，要读 `failed`。

## 2. 锚点漂移与重锚

宿主升级后，`pattern` 可能不再逐字命中。流程：

```sh
ungate diagnose                    # 列出 drifted：id、文件、行号、候选片段
ungate diagnose --json | jq '.drifted'   # 机器读
ungate reanchor apply 33 --index 0 --lines 812-826   # dry-run：看候选与 uniquely-applies
ungate reanchor apply 33 --index 0 --lines 812-826 --yes   # 写入本地覆盖
ungate reanchor clear 33           # 撤销覆盖，回到出厂锚点
```

规则：

- 候选片段必须在文件里**唯一**出现，否则命令会拒绝并报出现次数。
- 覆盖写 `$DSH_HOME/dsh-purge/anchor-overrides.json`，不改插件源码；升级插件时保留。
- `optional` 补丁找不到目标时记 `na`，不产生漂移；非 optional 的目标缺失会进 `missing_file`，要真查。

## 3. 逐文件状态

`patchStatusDetail()` 同时给出 `files[id] = [{key, path, status}]`，状态 `applied | pending | skipped | unmatched | missing | unreadable`，接口字段 `patch_files`。

多文件补丁声明 `fileAllRequired: true` 时才可能产生 `partial`：至少一个存在的目标没命中、另一个已命中。`partial` 不算 ready，自检会把它所在层标成异常。给某条补丁加这个标记前，先确认它的每个文件在新版宿主里都**必须**落地。

`fileOptional: ["key"]` 表示该目标在新版宿主已不承载这段逻辑：不参与 `partial`，但仍逐文件展示。

## 4. 面板与 HTTP 接口

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| GET | `/dsh-purge/status` | 版本、宿主、补丁计数、`patch_files`、兼容性 |
| GET | `/dsh-purge/selfcheck` | 20 层证据 |
| GET | `/dsh-purge/community` | 快照、审计摘要 |
| POST | `/dsh-purge/apply` · `revert` | 写宿主 |
| POST | `/dsh-purge/tuning` | boost / injectPosition / askNoBlock / refusalRetry |
| CLI | `ungate backup` / `ungate rollback <id>` / `ungate prune` | 本机快照与回滚（无 HTTP 路由） |

token 在服务日志里：`sudo grep -aoE "token=[A-Za-z0-9_-]+" <log> | tail -1`。接口只挂在本进程的 web server 上，不监听外部。

## 5. 备份与审计

- 快照：`$DSH_HOME/dsh-purge-minimal/backups/<id>/manifest.json` + `objects/` 里的大文件（宿主源码副本按内容寻址）。快照不包含用户提示词正文的额外副本。
- 审计：`$DSH_HOME/dsh-purge-minimal/audit.jsonl`，1MB 轮转保留 2 份。事件：`apply`、`revert`、`boost`、`probe`、`preset`、`reanchor`、`tuning_setting`、`refusal_retry`、`refusal_retry_outcome`。
- `ungate audit --limit 20` 是最快的"刚才发生了什么"。

## 6. 拒绝重试层

`ungate retry on|off`（默认 off）。插件在 `llm/stream` waterfall 上缓冲输出开头（≤400 字符），命中拒绝特征就丢弃并在系统提示尾部追加一段加固语，重跑一次。每次重试写 `refusal_retry`（只记长度与前 80 字符）。

排查顺序：先看 `ungate audit --limit 20` 有没有 `refusal_retry`；有，再考虑调 `injectPosition` 或强化段，不要先怀疑补丁。

## 7. 发版检查单

1. `package.json`：`version`、`dshReleases`、`dshTarget`、`install.tarball`（必须是 `releases/download/v<版本>/dsh-ungate-<版本>.tgz`）。
2. `release-notes.md` 首行改成 `# <版本>`，写清移除/变更/验证/已知问题。
3. 当前文档里的版本行、兼容表同步；上游历史资料归档已在 0.2.3 移除，原文见 git 历史，不要新建 `docs/upstream/`。
4. `pnpm test` → `pnpm run smoke` → `pnpm run check:docs` → `pnpm run check:client`。
5. 面板改了 `packages/purge-panel/src` 必须 `pnpm run build:client`，否则客户端 bundle 与源码不一致。
6. 打 tag `v<版本>`，发行包与 `install.tarball` 对齐。

`check:docs` 会拦：版本不一致、README 两份不同、没有实测支撑的 `DSH Desktop x.y.z` 声明、发行包链接版本不符、当前文档里出现上游 1.6.x 或已删除功能的残留引用。

## 8. 测试结构

| 文件 | 覆盖 |
| --- | --- |
| `test/patch-anchors.test.mjs` | 每条补丁的真实锚点在宿主快照里命中 |
| `test/selfcheck.test.mjs` / `test/partial-status.test.mjs` | 层状态与逐文件状态 |
| `test/bootstrap-*.test.mjs` | 安装器：下载、校验、迁移、profile 选择 |
| `test/http-handlers-target.test.mjs` | 面板接口与目标解析 |
| `test/presets.test.mjs` / `test/preset-injection.test.mjs` | 预设注册与注入排除 |
| `test/expect-contract.test.mjs` | 带 `expect: N` 的锚点契约 |

测试默认在干净环境运行；`scripts/bootstrap-install.mjs` 只在没有显式 home 时继承 `DSH_PROFILE`。

## 9. 不做的事

- 不自动重启用户 DSH；不替用户决定何时退出。
- 不覆盖用户提示词、规则、其他插件配置。
- 不在线自更新（见 [STATE](STATE.md#已知限制)）。
- 不把组件测试通过写成"完整桌面已验证"。

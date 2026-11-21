# AGENTS.md — 本仓库的开发约定

> 给在**这个仓库里改代码**的 agent 看。使用说明在 [README](README.md)，运维在 [docs/RUNBOOK.md](docs/RUNBOOK.md)。
> 当前版本：**0.2.7**（`dsh-ungate` 0.2.7）· 27 条宿主补丁

## 先读哪几个文件

| 要改什么 | 先读 |
| --- | --- |
| 补丁定义 | `lib/core.js` 的 `ALL_PATCHES`、`lib/patches/*.mjs`、`targetFiles()` |
| 补丁状态与自检 | `lib/selfcheck.js`、`lib/patches/index.mjs`、[STATE](docs/STATE.md) |
| 注入装配 | `lib/identity.js`（`modePromptText` / `rewritePromptAssembly`）、`lib/boost.js` |
| 面板 | `packages/purge-panel/src/`，产物是仓库根的 `client.js` |
| 安装与快照 | `lib/community.js`（`Maintenance`）、`scripts/bootstrap-install.mjs` |

## 改补丁的规矩

1. 目标文件在 `targetFiles()` 里登记键名，补丁里不写死绝对路径。
2. `replace` 里留 `[dsh-purge]` 标记，并把同一段字符串写进 `markers`——判定「已应用」只认它。
3. 在 `test/patch-anchors.test.mjs` 钉一份真实宿主片段做回归。
4. 第三方插件目标用 `optional: true`：不在场记 `na`，不算失败。
5. 宿主升级后锚点漂移先跑 `ungate diagnose` 看候选落点，不要凭猜改 pattern。

## 不变量

- `$DSH_HOME/prompt-inject.md`、规则集、其他插件配置：任何时候都不写。
- 插件 id 仍是 `dsh-purge`，数据目录仍是 `$DSH_HOME/dsh-purge-minimal/`：改包名不改这两处，否则已有配置失效。
- `apply` 前必须留快照；`revert` 只撤自己写过的补丁，不整份覆盖宿主文件。
- 面板的 HTTP 前缀仍是 `/dsh-purge/`，聊天斜杠命令仍是 `/purge`。
- 运行时 section 名前缀 `dsh-purge*` / `dshpg-*` 不能改：宿主侧补丁把「名字以 `dsh-purge` 开头」的段当作 phase-1 保留（`lib/phase1-keep.js`），改名会让注入被宿主丢掉。
- `[dsh-purge]` 补丁标记、`.dshpurge.bak` 宿主备份后缀、`__dshPurge*` 全局键同样是磁盘契约：改了就认不出已应用的宿主与旧备份。

## 测试与构建

```sh
pnpm install --frozen-lockfile --allow-build=esbuild
pnpm test               # 459 项
pnpm run check:docs     # 版本、兼容声明、残留引用
pnpm run smoke          # 打包后验证
pnpm run test:ui        # 面板 bundle 契约
```

- 改面板源码要重建 bundle：`pnpm run build:client`（产物写仓库根 `client.js`，随包发布；`pnpm run check:client` 校验是否过期）。
- 测试在干净环境跑：`scripts/bootstrap-install.mjs` 只在没有显式 home 时才继承 `DSH_PROFILE`，所以从 DSH 会话里跑也不会串 profile。
- 重启本机 DSH 不能在当前会话的 cgroup 里 `systemctl stop dsh-web`（会连带杀掉会话）；用 `sudo systemd-run --unit=... --collect systemctl restart dsh-web`。
- 真机验收（Electron、Windows 换包）另开隔离实例，不能拿组件测试冒充。

## 发版清单

1. `package.json`：`version`、`dsh.install.tarball`、`dsh.compatibility.dshReleases`、`dshTarget`。
2. 文档同步：`README.md`、`docs/README.en.md`（成对，`node scripts/i18n-pairing.mjs --write` 记录）、`docs/INSTALLATION.md`、`docs/MAINTENANCE.md`、`docs/RUNBOOK.md`、`docs/STATE.md`、本文件。
3. `release-notes.md` 首行必须是 `# <version>`。
4. `pnpm run check:docs && pnpm test` 全绿后 `pnpm pack`，打 tag，release workflow 出 tgz。

`check:docs` 还会拦：上游 1.6.x 残留、已删除功能的死引用、没有实测支撑的 `DSH Desktop x.y.z` 声明、发行包链接版本不一致。CI 在 `.github/workflows/ci.yml`。

<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/banner-dark.svg">
  <img src="docs/banner.svg" alt="dsh-ungate" width="640">
</picture>

# dsh-ungate

**把 DeepSeek Harness 的部分限制去掉：审批弹窗、沙箱拒绝、模型「建议你自己执行」的推脱。**

27 条宿主补丁 · 20 层状态自检 · 左侧栏面板

[![Release](https://img.shields.io/github/v/release/youki258/dsh-ungate?label=release)](https://github.com/youki258/dsh-ungate/releases)
[![Stars](https://img.shields.io/github/stars/youki258/dsh-ungate?logo=github&label=Stars)](https://github.com/youki258/dsh-ungate/stargazers)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat)](LICENSE)
[![Node](https://img.shields.io/badge/Node.js-%3E%3D18-339933?logo=node.js&logoColor=fff)](https://nodejs.org)

当前版本 **0.2.5** · 已验证 **DSH Desktop 0.2.1-rc.1 / 0.2.1-rc.2 / 0.2.1-rc.3 / 0.2.1-rc.5 / 0.2.2-rc.1 / 0.2.2-rc.5**（0.2.2 限 web 与 npm CLI 面） · [English](docs/README.en.md)

</div>

---

## 它是什么

跑在本机的一个 DSH 插件。装上之后，日常里几处打断会消失：

- **不再逐次点允许** —— 工具调用不再弹审批框，直接执行。
- **不再被沙箱拦** —— 写文件、跑命令按 profile 的权限走（默认 `danger-full-access`）。
- **不再被劝自己动手** —— 模型那句「我需要你先确认」「建议你自己跑一下」不再出现。
- **提示词你自己说了算** —— `$DSH_HOME/prompt-inject.md` 的正文每轮进入系统提示。

它不改模型本身，也不替你做判断：目标归属由操作者声明，插件不做内容审核，也不做公网门禁。改动只落在宿主源码副本上，应用前自动快照，`ungate revert` 可撤。

## 安装

**固定版本 tgz（推荐）**

```sh
dsh plugin --profile web add https://github.com/youki258/dsh-ungate/releases/download/v0.2.5/dsh-ungate-0.2.5.tgz
```

**npm**

```sh
dsh plugin --profile web add dsh-ungate@0.2.2
```

npm 上的版本停在 0.2.2（发布账号正在取回，0.2.3 之后的版本先走上面的 tgz）。

**社区安装器**（备份迁移、旧包换装，先 `--dry-run` 看一遍）

```sh
sh scripts/install.sh --dry-run      # Linux/macOS
pwsh scripts/install.ps1 -DryRun     # Windows
```

桌面壳把 `--profile web` 换成 `desktop`。

## 装完三步

```sh
ungate apply
ungate selfcheck --json
ungate probe new
```

`apply` 等价于面板点「应用」：写宿主源码副本并留备份。写完**完全退出 DSH**（托盘退出 / ⌘Q，不是关窗口）再打开，然后 `selfcheck --json` 应给出 `state=ok`、`broken` 为空，`probe new` 生成的 nonce 由模型原样回显即链路通。

磁盘写成功不等于已加载：宿主模块只在启动时 import 一次，结论以重开后的自检与探针为准。

## 兼容性

| 宿主 | 结果 |
| --- | --- |
| DSH Desktop 0.2.1-rc.1 / rc.2 / rc.3 / rc.5 | 已验证 |
| DSH Desktop 0.2.2-rc.1 / 0.2.2-rc.5 | 已验证（web 面；rc.5 的锚点全部命中，写盘需可写宿主副本） |
| 其它 0.2.x | 先跑 `ungate diagnose` |

0.2.2-rc.5 的实测口径：27 条补丁 id 全部解析出结果——21 条锚点命中待应用、6 条桌面专属不适用，`missing_file` 与 `drifted` 均为 0。

锚点回归由 `test/patch-anchors.test.mjs` 覆盖，逐版本结果记在 [release-notes](release-notes.md)。

## 命令

| 命令 | 作用 |
| --- | --- |
| `ungate status` / `selfcheck [--json]` | 宿主与补丁概况 / 20 层逐层证据 |
| `ungate apply` / `revert` | 写补丁 / 撤补丁（都先备份） |
| `ungate diagnose` / `reanchor …` | 锚点漂移诊断 / 半自动重锚 |
| `ungate backup` / `rollback <id>` | 快照 / 回滚 |

全部命令与退出码见 [CLI](docs/CLI.md)。`purge`、`dsh-purge` 是同一入口的旧名，仍然可用；聊天里的斜杠命令仍是 `/purge`。

## 更新

插件不自更新。市场装的走 DSH 插件市场或 `dsh plugin --profile <n> update`；tgz 装的换新版重跑 `plugin add`（本包在插件管理器里属 `not-updatable`，重装就是升级）；宿主升级后 `asar` 重新封住，点一次「应用」再退出重开。

## 文档

| 文件 | 内容 |
| --- | --- |
| [docs/INSTALLATION.md](docs/INSTALLATION.md) | 安装、升级、回滚、故障定位 |
| [docs/CLI.md](docs/CLI.md) | 全部命令、退出码、旧名兼容 |
| [docs/STATE.md](docs/STATE.md) | 27 条补丁明细、自检语义、已知限制 |
| [docs/MAINTENANCE.md](docs/MAINTENANCE.md) | 锚点漂移与重锚、HTTP 接口 |
| [docs/RUNBOOK.md](docs/RUNBOOK.md) | 运维：重启、体检、恢复 |

## 来源与许可

MIT，见 [LICENSE](LICENSE)。

- 上游：[YuJunZhiXue/dsh-purge](https://github.com/YuJunZhiXue/dsh-purge)（小杨 / YuJunZhiXue）。
- 代码来自社区分支 [kingcharleslzy-ai/dsh-purge](https://github.com/kingcharleslzy-ai/dsh-purge) 的 minimal 裁剪；本仓库 [youki258/dsh-ungate](https://github.com/youki258/dsh-ungate) 在其上做减法：去掉工具面与历史调试入口、去掉在线自更新、补丁表压到 27 条。不是上游作者的官方发布。
- 完整归属见 [NOTICE.md](NOTICE.md) 与 [CONTRIBUTORS.md](CONTRIBUTORS.md)。

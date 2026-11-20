# 桌面壳测试卡（0.2.5，6 条桌面补丁）

给在 **DSH Desktop**（Windows / macOS 桌面壳）上做验收的人。npm 分发里没有桌面壳源码，这 6 条补丁（#45/46/82/83/84/92）的锚点命中只能靠现场验证——本卡给出完整步骤与每条的预期现象。

## 0. 前提

- 官方 DSH Desktop 0.2.2-rc.1（或 0.2.1-rc.5）已安装并可正常启动。
- 插件按 [INSTALLATION](INSTALLATION.md) 装进 **desktop profile**（桌面壳默认 profile 是 `desktop`）。
- 「应用」→ **完全退出（托盘右键退出 / ⌘Q，不是关窗口）** → 重开。

## 1. 一分钟体检

```sh
node bin/community.js selfcheck --json   # 桌面面应为 27/27，na=0
node bin/community.js diagnose --json    # drifted/missing 应为 0
```

- `patch_status` 里 45/46/82/83/84/92 全部 `applied` → 锚点全命中，测试结束，2/3/4 可跳过。
- 出现 `na` / `skipped` / `drifted` → 对照下表判断，或直接看 §5 兜底。

| id | 补丁 | optional | 级联 | na/skip 的含义 |
| --- | --- | --- | --- | --- |
| 45 | 官方升级接管（quitAndInstall → wscript 换包） | ✓ | — | 桌面壳无 `quitAndInstall` 锚点（版本变了），用 §5 |
| 46 | 升级脚本 ASCII 化（防中文路径吞换行） | ✓ | 依赖 #45 注入的函数头 | #45 没打上时正常 skip |
| 82 | 主进程 DSH_PROFILE=desktop 兜底 | ✓ | — | `silentWhenMissing`：锚注释不在场，静默按不适用处理 |
| 83 | host 被信号杀不弹 crash 对话框 | ✗ | — | **非 optional**，na/broken 都要处理 |
| 84 | host code=0 退出不弹 stopped 对话框 | ✓ | 依赖 #83 的替换结果 | #83 没打上时正常 skip |
| 92 | host HTTP 头上限 256KB | ✓ | — | 桌面壳主进程无 `--expose-internals` 锚点 |

## 2. #45/46 官方升级接管（Windows 为主）

1. 桌面壳内触发官方更新（检查更新 → 下载完成）。
2. 观察 `%TEMP%\dsh-purge-official-update.log`：应出现换包日志而不是黑窗一闪后旧版本重开。
3. 重开后 `node bin/community.js status`：宿主版本应为新版本，且 `app.asar` 仍处于解开状态。
4. 中文用户名路径的机器额外验证：升级日志无乱码、无「脚本换行丢失」报错（#46 的 ASCII 化生效）。
5. 失败回退：接管脚本抛错时自动走原生 `quitAndInstall`，升级仍应完成——只是没有「保留解开目录」的能力。

## 3. #82 双击启动 profile 兜底

1. 从资源管理器/访达**双击**桌面壳 exe（不经终端）。
2. 启动后新会话下拉应出现「无限制模式」；面板状态页正常显示宿主版本。
3. 若启动即报 `cannot determine the boot profile` → #82 未生效（锚点漂移或未应用）。

## 4. #83/84 host 退出对话框 + #92 头上限

1. 信号杀 host 子进程（Windows：任务管理器结束 `dsh desktop host` 进程树；macOS：`kill <host pid>`）→ **不应**弹 crash 对话框、宿主目录不新增 crash log（#83）。
2. 正常退出 DSH → 不应弹「dsh desktop host stopped」对话框（#84）。
3. 长会话（历史 cookie 累积到几 KB 的机器）打开面板不再报 431/请求头过大（#92）。

## 5. 锚点漂移兜底

```sh
node bin/community.js diagnose --json          # 找 drifted 条目的文件/行号/候选片段
node bin/community.js reanchor show <id>       # 看 dry-run 候选
node bin/community.js reanchor apply <id> --lines A-B --yes
# 覆盖写入 anchor-overrides.json 后点一次「应用」→ 退出重开
```

重锚后把「宿主版本 + diagnose 输出片段」发到 issue，锚点会随下一个版本固化进补丁表。

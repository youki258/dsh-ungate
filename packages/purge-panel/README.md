# dsh-purge-panel

`dsh-ungate` 的面板前端：注册左侧栏页面，读写宿主插件暴露的 `/dsh-purge/*` 接口。它不改宿主文件、不装会话钩子、不复制后端逻辑。

- 源码在 `src/`，React + 自研 `dshpp-` 样式前缀，独立 locale 命名空间。
- 产物只有一份：仓库根 `client.js`，由 `scripts/build.mjs` 生成，不要手改。
- 构建：`pnpm run build:client`；校验：`pnpm run check:client`。
- 本目录不是独立插件，不进 npm 包；版本号与主包一致。

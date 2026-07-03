# Sprint 0 Baseline

## 当前阶段

项目处于 Sprint 0：工程初始化与第一个可交付页面。

已完成的基础能力：

- Vite + React + TypeScript 项目可以启动和构建。
- 已接入 React Router，并完成后台应用壳、仪表盘、工单列表占位页和 404。
- 已配置 ESLint、Prettier、EditorConfig、Vitest、Testing Library 和 Playwright。
- `format:check`、`typecheck`、`lint`、`test`、`build`、`e2e` 已能本地运行。

## 当前能力盘点

React：

- 能阅读 JSX、组件、Props、事件处理、条件渲染和列表渲染。
- 需要继续练习组件拆分、状态归属、Effect 边界和性能分析。

TypeScript：

- 已开启严格检查方向，项目禁止随意使用 `any`。
- 需要继续熟悉类型推导、泛型、接口契约和第三方库类型。

工程化：

- 已建立脚本、格式化、Lint、单测、E2E 和生产构建基线。
- 需要继续补齐 CI、PR 流程、ADR、代码评审和发布检查。

测试：

- 已有一个组件 smoke test 和一个 E2E smoke test。
- 后续需要按业务规则补纯函数单测，按用户行为补组件测试，按关键路径补 E2E。

## 薄弱点

- URL 状态和复杂筛选条件的设计。
- 请求缓存、乐观更新、失败回滚和并发冲突处理。
- 复杂表单的字段校验、服务端错误映射和草稿保护。
- RBAC 权限矩阵的路由、按钮和数据权限分层。
- 性能预算、无障碍检查和错误监控的实践。

## 时间预算

建议节奏：

- 每周投入 8 到 12 小时。
- 每次开发前先确认验收标准。
- 每个小任务完成后至少运行 `pnpm typecheck`、`pnpm lint` 和相关测试。

## Sprint 0 目标

- 克隆仓库后可以在 10 分钟内启动项目。
- `dev`、`build`、`lint`、`typecheck`、`test`、`e2e` 均可运行。
- 完成基础应用壳，桌面与 375px 宽度下核心导航可用。
- 完成 CI、PR 模板、贡献说明和第一个 ADR。

## Sprint 0 自测记录

初始化后已验证：

```bash
pnpm format:check
pnpm typecheck
pnpm lint
pnpm test
pnpm build
pnpm e2e
```

已知事项：

- 当前 Ant Design 首次打包体积较大，后续通过路由懒加载和拆包优化。
- 本机 Node 运行架构与系统架构可能不同，原生依赖需要在 CI 中持续验证。

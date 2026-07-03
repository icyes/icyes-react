# ADR 0001: Frontend Stack

## Status

Accepted

## Date

2026-07-04

## Context

PulseOps 是一个 React 企业级实战项目。目标不是只做静态页面，而是完整练习中大型前端项目中的路由、状态、请求、表单、权限、测试、工程质量和交付流程。

当前阶段是 Sprint 0，需要先建立稳定、可解释、可扩展的工程基线。

## Decision

主技术栈选择：

- React + TypeScript + Vite
- React Router
- Ant Design + CSS Modules + Design Token
- pnpm
- ESLint + Prettier + EditorConfig
- Vitest + React Testing Library
- Playwright

后续按阶段引入：

- M3 引入 TanStack Query 和 MSW，处理服务端状态与接口模拟。
- M4 引入 React Hook Form 和 Zod，处理复杂表单与运行时校验。
- M6 再评估是否引入 Zustand，避免过早增加全局状态复杂度。

## Rationale

React + TypeScript + Vite：

- 贴合现代 SPA 项目开发方式。
- Vite 启动快、配置轻，适合训练构建、入口、环境变量和生产产物。
- TypeScript strict 能提前暴露接口和业务模型问题。

React Router：

- 适合练习后台系统常见的嵌套路由、权限路由、动态参数、404 和 URL 状态。
- 工单列表的分页、筛选、搜索和排序需要同步到 URL。

Ant Design：

- 贴近企业后台场景，表格、表单、弹窗、布局和反馈组件完整。
- 能把学习重点放在业务建模、交互状态和质量体系上，而不是重复造基础 UI。

pnpm：

- 安装速度快，锁文件明确，适合团队统一依赖版本。

Vitest + Testing Library：

- 与 Vite 集成自然。
- Testing Library 鼓励从用户可观察行为出发写测试，降低对实现细节的耦合。

Playwright：

- 用真实浏览器验证登录、导航、建单、筛选、权限等关键路径。
- 支持 trace、截图和 CI 报告，适合后续排查 E2E 问题。

## Alternatives Considered

Next.js：

- 优点是全栈能力完整。
- 本项目重点是企业后台 SPA 训练，暂不需要服务端渲染和文件路由。

Redux Toolkit：

- 适合复杂客户端状态。
- 当前阶段先用 React 内置状态与 Context，等出现明确跨模块客户端状态后再评估。

Express 后端直连：

- 当前 Sprint 0 到 M2 主要是前端工程和页面骨架。
- 真实接口可在契约稳定后再接入，M3 前优先使用 MSW。

## Consequences

收益：

- 技术栈清晰，学习路径渐进。
- 工程基线覆盖类型、格式、Lint、单测、E2E 和构建。
- 后续功能可以按 `app/pages -> features -> entities -> shared` 的方向演进。

代价：

- Ant Design 会带来一定首包体积，需要后续路由懒加载和拆包优化。
- 使用 Vite SPA 意味着部署侧需要配置 history fallback。
- 当前不引入重型状态库，复杂跨页面状态出现前需要谨慎管理 Context 边界。

## Validation

当前基线应通过：

```bash
pnpm format:check
pnpm typecheck
pnpm lint
pnpm test
pnpm build
pnpm e2e
```

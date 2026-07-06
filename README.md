# Icyes React 实战训练营

这是一个以企业级协作与工单平台 **PulseOps** 为载体的 React 实战学习项目。

目标不是只做出页面，而是完整练习需求拆解、技术设计、编码、测试、Code Review、持续集成与项目复盘，最终具备快速接手中大型 React 项目的能力。

## 从这里开始

- [完整项目需求与学习路线](./docs/REACT_PRACTICE_ROADMAP.md)
- [Sprint 0 学习记录](./docs/learning-notes/00-baseline.md)
- [前端技术栈 ADR](./docs/decisions/0001-frontend-stack.md)
- [贡献指南](./CONTRIBUTING.md)

当前阶段：**Sprint 0 — 工程初始化与第一个可交付页面**。

## 本地开发

先启动同级目录中的认证服务（默认监听 `3000` 端口）：

```bash
cd ../icecred-node
pnpm start:dev
```

再启动前端。开发服务器会把 `/api/*` 代理到认证服务：

```bash
pnpm install
pnpm dev
```

如需连接其他环境，可在 `.env.local` 中配置 `VITE_API_BASE_URL`。

常用脚本：

```bash
pnpm typecheck
pnpm lint
pnpm test
pnpm build
pnpm e2e
```

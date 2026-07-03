# Contributing

## 开发环境

建议使用：

- Node.js 22
- pnpm 11.7.0 或以上

首次启动：

```bash
pnpm install
pnpm dev
```

本地访问：

```text
http://127.0.0.1:5173/
```

## 常用脚本

```bash
pnpm format:check
pnpm typecheck
pnpm lint
pnpm test
pnpm build
pnpm e2e
```

提交前至少运行与本次改动相关的检查。涉及页面、路由或关键用户路径时，需要运行 `pnpm e2e`。

## 分支与提交

从 `main` 创建功能分支：

```bash
git checkout -b feat/s0-topic
```

建议分支命名：

- `feat/<scope>-<topic>`
- `fix/<scope>-<topic>`
- `docs/<scope>-<topic>`
- `chore/<scope>-<topic>`

提交保持小步、可解释。提交信息建议描述行为变化，而不只是文件变化。

## 代码规范

- TypeScript 保持严格模式。
- 业务代码不要随意使用 `any`。
- 组件优先按业务边界拆分，避免巨型页面组件。
- 公共能力放在 `shared`，业务能力后续放在 `features`。
- 新增复杂技术决策时，在 `docs/decisions` 下补 ADR。

## 测试约定

- 纯业务规则优先写单元测试。
- 组件测试从用户可见行为出发，不依赖内部实现细节。
- E2E 只覆盖关键路径，避免把所有分支都堆到浏览器测试里。
- 测试数据应相互隔离，不依赖执行顺序。

## Pull Request

PR 需要说明：

- 背景和目标
- 改动内容
- 截图或录屏
- 自测命令
- 风险和后续事项

所有 CI 质量门禁通过后再合并。

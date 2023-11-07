# happy UI

happy ui 是基于 React 的 轻量级 UI 组件库。

## 特性
- 📦 开箱即用的高质量 React 组件。
- 🎨 预计超过 50 个组件，目前已完成 15+ 个组件
- ⚙️ 所有组件均使用 TypeScript 开发。
- 🛡 适用于大部分的业务场景

## 安装

推荐 `pnpm` 对包进行管理

```js
pnpm install happy-ui -D
```

## 示例

```jsx
import React from 'react';
import { Alert } from 'happy-ui';

export default () => {
  return <Alert message="Success Text" type="success" />;
};
```

## 拥抱 Typescript

happy-ui 使用 TypeScript 进行书写并提供了完整的定义文件。

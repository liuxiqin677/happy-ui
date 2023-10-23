
# happy UI
happy ui 是基于 React 的 轻量级 UI 组件库。

## 特性
- 🌈 提炼自企业级中后台产品的交互语言和视觉风格。
- 📦 开箱即用的高质量 React 组件。
- 🛡 使用 TypeScript 开发，提供完整的类型定义文件。
- ⚙️ 全链路开发和设计工具体系。
- 🌍 数十个国际化语言支持。
- 🎨 深入每个细节的主题定制能力。

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
  return (
    <Alert
      message='Success Text'
      type='success'
    />
  )
}
```

## 拥抱 Typescript
happy-ui 使用 TypeScript 进行书写并提供了完整的定义文件。
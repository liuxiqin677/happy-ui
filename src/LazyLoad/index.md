---
title: LazyLoad 懒加载
nav:
  path: /components
group:
  title: 数据展示
  order: 5
mobile: false
toc: content
---

<h1>LazyLoad</h1>
对特定内容进行监测，出现时静态加载。

何时使用：
- 常用于长列表、SPA首页中，对数据进行懒加载，从而优化页面

```jsx
/**
 * title: 基本使用
 * description: 懒加载基本使用
 */

import React from 'react';
import { LazyLoad } from 'happy-ui';

export default () => {
  return (
    <div style={{
      height: '200px',
      overflow: 'auto'
    }}>
      <p>Hello Joylne!</p>
      <p>Hello Joylne!</p>
      <p>Hello Joylne!</p>
      <p>Hello Joylne!</p>
      <p>Hello Joylne!</p>
      <p>Hello Joylne!</p>
      <p>Hello Joylne!</p>
      <p>Hello Joylne!</p>
      <p>Hello Joylne!</p>
      <p>Hello Joylne!</p>
      <p>Hello Joylne!</p>
      <p>Hello Joylne!</p>
      <p>Hello Joylne!</p>
      <p>Hello Joylne!</p>
      <p>Hello Joylne!</p>
      <p>Hello Joylne!</p>
      <p>Hello Joylne!</p>
      <p>Hello Joylne!</p>
      <p style={{color: 'red'}}>底部懒加载....</p>
      <LazyLoad delay={1000}>
        <p>happy-ui</p>
        <p>happy-ui</p>
        <p>happy-ui</p>
        <p>happy-ui</p>
        <p>happy-ui</p>
        <p>happy-ui</p>
      </LazyLoad>
    </div>
  );
}
```

## API
| 属性 | 类型               | 默认值   | 必填 | 说明 |
| ---- | ------------------| -------- | ---- | ---- |
| className | string | - |  false  | 传入的类名
| style | CSSProperties | - |  false  | 传入的 style
| delay | number | - |  false  | 延迟懒加载


## 思路
LazyLoad 的思路是利用 `IntersectionObserver` 这个观察对象来实现的。
具体可见：https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver
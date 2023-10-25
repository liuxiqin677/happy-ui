---
title: Flex 弹性布局
nav:
  path: /components
group:
  title: 布局
  order: 2
mobile: false
toc: content
---

# Flex
何时使用
- 适合设置元素之间的间距。
- 适合设置各种水平、垂直对齐方式。

## 基本布局

最简单的用法

<code src="./demos/demo1.tsx"></code>

## 对齐方式
设置对齐方式

<code src="./demos/demo2.tsx"></code>

## 设置间隙
使用 `gap` 设置元素之间的间距，预设了 `small`、`middle`、`large` 三种尺寸，也可以自定义间距。

<code src="./demos/demo3.tsx"></code>

## 自动换行
自动换行。

<code src="./demos/demo4.tsx"></code>

## API
| 属性 | 类型               | 默认值   | 必填 | 说明 |
| ---- | ------------------| -------- | ---- | ---- |
| vertical | boolean | false |  false  | flex 主轴的方向是否垂直，使用 flex-direction: column
| wrap | 参考 [flex-wrap](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-wrap) | nowrap |  false  | 设置元素单行显示还是多行显示
| justify | 参考 [justify-content](https://developer.mozilla.org/zh-CN/docs/Web/CSS/justify-content) | normal |  false  | 设置元素在主轴方向上的对齐方式
| align | 参考 [align-items](https://developer.mozilla.org/zh-CN/docs/Web/CSS/align-items) | normal |  false  | 设置元素在交叉轴方向上的对齐方式
| flex | 参考 [flex](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex) | normal |  false  | flex CSS 简写属性
| gap | 'small'、'middle'、'large'、string、number | - |  false  | 设置网格之间的间隙
| className | string | - |  false  | 传入的类名
| style | CSSProperties | - |  false  | 传入的内联样式

## 思路
请看我的这篇文章：[Flex组件的注意点](https://juejin.cn/post/7293783188232978444)
---
title: Layout 布局
nav:
  path: /components
group:
  title: 布局
  order: 2
mobile: false
toc: content
---

# Layout

快速成型常见网页布局

组件概述

- `Layout`：布局容器，其下可嵌套 Header Sider Content Footer 或 Layout 本身，可以放在任何父容器中。
- `Header`：顶部布局，自带默认样式，其下可嵌套任何元素，只能放在 Layout 中。
- `Sider`：侧边栏，自带默认样式及基本功能，其下可嵌套任何元素，只能放在 Layout 中。
- `Content`：内容部分，自带默认样式，其下可嵌套任何元素，只能放在 Layout 中。
- `Footer`：底部布局，自带默认样式，其下可嵌套任何元素，只能放在 Layout 中。

## 基本使用

布局组件的基本使用

<code src="./demos/demo1.tsx"></code>

## 自定义样式

自定义布局的样式

<code src="./demos/demo2.tsx"></code>

## API

### Layout、Header、Footer、Sider、Content

| 属性       | 类型          | 默认值 | 必填  | 说明       |
| ---------- | ------------- | ------ | ----- | ---------- |
| extraStyle | CSSProperties | -      | false | 额外的样式 |

### Sider、Content

| 属性 | 类型   | 默认值               | 必填  | 说明                    |
| ---- | ------ | -------------------- | ----- | ----------------------- |
| row  | number | Sider：3, Content: 7 | false | Sider 和 Content 的占比 |

## 思路

Layout 组件很简单，写好布局样式即可。

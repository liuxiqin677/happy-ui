---
title: Divider 分割线
nav:
  path: /components
group:
  title: 布局
  order: 2
mobile: false
toc: content
---

# Divider

区隔内容的分割线。

## 何时使用
- 对不同章节的文本段落进行分割。
- 对行内文字/链接进行分割，例如表格的操作列。

## 代码演示

### 水平分割线

默认为水平分割线，可在中间加入文字。

<code src="./demos/demo1.tsx"></code>

### 带文字的分割线

分割线中带有文字，可以用 `orientation` 指定文字位置。

<code src="./demos/demo2.tsx"></code>

### 分割文字使用正文样式

使用 `plain` 可以设置为更轻量的分割文字样式。

<code src="./demos/demo3.tsx"></code>

### 垂直分割线

使用 type="vertical" 设置为行内的垂直分割线。

<code src="./demos/demo4.tsx"></code>

## API
| 属性 |  类型   | 默认值   | 必填 | 说明 
| ---- | ------------------| -------- | ---- | ---- |
| className | string | - |  false  | 分割线样式类		
| style | CSSProperties | - |  false  | 分割线样式对象		
| type | `horizontal`、`vertical` | `horizontal` |  false  | 水平还是垂直类型	
| dashed | boolean | false |  false  | 是否虚线
| orientation | `left`、`right`、`center` | `center` |  false  | 分割线标题的位置
| orientationMargin | string、number | false |  false  | 标题和最近 left/right 边框之间的距离，<br/> 去除了分割线，同时 `orientation` 必须为 left 或 right。<br/>如果传入 string 类型的数字且不带单位，默认单位是 px
| plain | boolean | false |  false  | 是否虚线

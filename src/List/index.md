---
title: List 列表
nav:
  path: /components
group:
  title: 数据展示
  order: 5
mobile: false
toc: content
---

# List 列表
通用列表。

## 何时使用
最基础的列表展示，可承载文字、列表、图片、段落，常用于后台数据展示页面。

## 基本使用

列表的基本使用

<code src='./demos/demo1.tsx'></code>

## 不同尺寸

设置 `size` 可设定不同尺寸。

<code src='./demos/demo2.tsx'></code>

## 加载更多

设置`loadMore`， 且传入 `lazyScrollAtBottom` 回调可以实现 加载更多

<code src='./demos/demo3.tsx'></code>

## 虚拟列表

配置 `isVirtualList`、设置 `virtualShowNum` 默认展示行数开启虚拟列表。

<code src="./demos/demo5.tsx"></code>


## API
| 属性 | 类型               | 默认值   | 必填 | 说明 |
| ---- | ------------------| -------- | ---- | ---- |
| className | string | - |  false  | 传入的类名
| style | CSSProperties | - |  false  | 传入的内联样式
| dataSource | Array<any> | - |  true  | 数据源
| renderItem | (item: any, index: number) => any; | - |  true  | 渲染子项函数
| header | ReactNode | - |  false  | 头部
| footer | ReactNode | - |  false  | 底部
| size | default、small、large | default |  false  | 尺寸
| loadMore | boolean | false |  false  | 是否加载更多，需要配合 `lazyScrollAtBottom` 使用
| lazyScrollAtBottom | (bottomDistance: number, loadMore: boolean) => any; | - |  false  | 加载更多的回调，需要配合 `loadMore` 使用
| isVirtualList | boolean | false |  false  | 是否开启虚拟列表
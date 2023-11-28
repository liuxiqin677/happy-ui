---
title: Tree 树
nav:
  path: /components
group:
  title: 数据展示
  order: 5
mobile: false
toc: content
---

# Tree 树

多层次的结构列表。

## 基本使用

Tree 的基本使用

<code src='./demos/demo1.tsx'></code>

## 可选择

配置 `selectable` 可选择的 Tree

<code src='./demos/demo2.tsx'></code>

## 获取展开收起的节点

配置 `onExpand` 、`onCollapse` 收集展开收起的节点

<code src='./demos/demo3.tsx'></code>

## 默认展开

配置 `open` 设置初始化节点展开

`注意`：`open` 为 true 的项，如果其子节点还有子节点，是不会展开子节点的子节点

<code src='./demos/demo4.tsx'></code>

## API

### Tree

| 属性       | 类型                   | 默认值 | 必填  | 说明           |
| ---------- | ---------------------- | ------ | ----- | -------------- |
| className  | `string`               | -      | false | 类名           |
| style      | `CSSProperties`        | -      | false | 样式           |
| data       | `Array<TTreeNodeData>` | -      | true  | 数据源，`必传` |
| selectable | `boolean`              | false  | false | Tree 是否可选  |

### TTreeNodeData

| 属性     | 类型                   | 默认值 | 必填  | 说明                    |
| -------- | ---------------------- | ------ | ----- | ----------------------- |
| id       | `string`               | -      | true  | 树节点的唯一 id，`必传` |
| label    | `string`               | -      | true  | 标签，`必传`            |
| open     | `boolean`              | false  | false | 树节点是否默认展开      |
| select   | `boolean`              | false  | false | 树节点是否默认选中      |
| children | `Array<TTreeNodeData>` | -      | false | 嵌套子节点              |

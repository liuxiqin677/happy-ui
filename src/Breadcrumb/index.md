---
title: Breadcrumb 面包屑
nav:
  path: /components
group:
  title: 导航
  order: 2
mobile: false
toc: content
---

# Breadcrumb 面包屑

面包屑是辅助导航模式，用于识别页面在层次结构内的位置，并根据需要向上返回。

## 基本使用

最基础的面包屑菜单。

<code src="./demos/demo1.tsx"></code>

## 自定义分隔符

配置 `separator` 参数，自定义分隔符。

<code src="./demos/demo2.tsx"></code>

## 自定义尺寸

通过自定义面包屑组件样式，自定义尺寸大小。

<code src="./demos/demo3.tsx"></code>

## 自定义内容

自定义内容

<code src="./demos/demo4.tsx"></code>

## API

## Breadcrumb

| 属性      | 类型          | 默认值 | 必填  | 说明             |
| --------- | ------------- | ------ | ----- | ---------------- |
| className | string        | -      | false | 自定义 CSS class |
| style     | CSSProperties | -      | false | 自定义 style     |
| separator | ReactNode     | `/`    | false | 自定义分隔符     |

## Breadcrumb.Item

| 属性      | 类型          | 默认值 | 必填  | 说明             |
| --------- | ------------- | ------ | ----- | ---------------- |
| className | string        | -      | false | 自定义 CSS class |
| style     | CSSProperties | -      | false | 自定义 style     |

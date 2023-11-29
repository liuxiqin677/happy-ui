---
title: Menu 菜单
nav:
  path: /components
group:
  title: 导航
  order: 2
mobile: false
toc: content
---

# Menu 菜单

为页面和功能提供导航的菜单列表。

## 何时使用

导航菜单是一个网站的灵魂，用户依赖导航在各个页面中进行跳转。一般分为顶部导航和侧边导航，顶部导航提供全局性的类目和功能，侧边导航提供多级结构来收纳和排列网站架构。

## 基本使用

菜单的基本使用

<code src='./demos/demo1.tsx'></code>

## 手风琴模式

手风琴模式

<code src='./demos/demo2.tsx'></code>

## 嵌套菜单

手风琴模式

<code src='./demos/demo3.tsx'></code>

## icon

自定义 icon

<code src='./demos/demo4.tsx'></code>

## 获取当前项

获取当前项

<code src='./demos/demo5.tsx'></code>

## API

### Menu

| 属性      | 类型          | 默认值 | 必填  | 说明             |
| --------- | ------------- | ------ | ----- | ---------------- |
| className | string        | -      | false | 自定义 CSS class |
| style     | CSSProperties | -      | false | 自定义 style     |
| single    | boolean       | false  | false | 是否是手风琴模式 |
| maxCount  | number        | -      | false | 最大显示数量     |

### MenuItem

| 属性      | 类型          | 默认值 | 必填  | 说明                          |
| --------- | ------------- | ------ | ----- | ----------------------------- |
| className | string        | -      | false | 自定义 CSS class              |
| style     | CSSProperties | -      | false | 自定义 style                  |
| label     | ReactNode     | -      | false | 菜单项标签                    |
| to        | string        | -      | false | 传了`to`，菜单项渲染为 a 标签 |
| icon      | ReactNode     | -      | false | 自定义菜单项 icon             |
| expand    | boolean       | false  | false | 菜单项是否展开                |
| disabled  | boolean       | false  | false | 菜单项禁用                    |

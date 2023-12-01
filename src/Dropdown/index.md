---
title: Dropdown 下拉菜单
nav:
  path: /components
group:
  title: 导航
  order: 2
mobile: false
toc: content
---

# Dropdown 下拉菜单

页面上的命令过多时，可将备选命令收纳到向下展开的浮层容器中。

## 基本用法

基础下拉菜单。

<code src="./demos/demo1.tsx"></code>

## Hover 移入

通过 `type = hover`，配置为移入式下拉菜单。

<code src="./demos/demo2.tsx"></code>

## 按钮式风格

提供 `status` 参数，切换为按钮式风格，共有`primary`、`error`、`warning`、`success` 四种。

<code src="./demos/demo3.tsx"></code>

## 弹出位置

配置 `position` 参数，选择菜单弹出位置，可选位置有 `top`、`bottom`、`left`、`right`，默认为 `bottom`。

<code src="./demos/demo5.tsx"></code>

## 图标菜单

通过 `data` 中的 `icon`项，配置每个菜单项的图标。

<code src="./demos/demo6.tsx"></code>

## 禁用

通过 `disabled` 禁用菜单，通过 `data` 中的 `disabled`，单项禁用。

<code src="./demos/demo7.tsx"></code>

## API

| 属性        | 说明           | 类型                                            | 默认值        | 必填  |
| ----------- | -------------- | ----------------------------------------------- | ------------- | ----- |
| style       | 自定义样式     | CSSProperties                                   | -             | false |
| className   | 类名           | string                                          | -             | false |
| data        | 配置数据项     | Array<string>、Array<dataType>                  | -             | true  |
| placeholder | 未选中展示文本 | string                                          | Please select | false |
| disabled    | 禁用           | boolean                                         | false         | false |
| type        | 选中类型       | hover、click                                    | click         | false |
| status      | 下拉菜单类型   | default 、 primary、 error、 warning 、 success | default       | false |
| position    | 出现位置       | top 、 bottom 、 left 、 right                  | bottom        | false |

## dataType

| 属性     | 说明                          | 类型            | 默认值 | 必填  |
| -------- | ----------------------------- | --------------- | ------ | ----- |
| content  | 标签名                        | string          | -      | true  |
| link     | 跳转链接                      | string          | -      | false |
| children | 子项(目前只支持一层 children) | Array<dataType> | []     | false |
| disabled | 禁用                          | boolean         | false  | false |
| icon     | 图标                          | ReactNode       | <></>  | false |

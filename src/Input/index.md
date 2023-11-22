---
title: Input 输入框
nav:
  path: /components
group:
  title: 数据录入
  order: 4
mobile: false
toc: content
---

# Input

通过鼠标或键盘输入内容，是最基础的表单域的包装。

## 何时使用

- 需要用户输入表单域内容时。
- 提供组合型输入框，带搜索的输入框，还可以进行大小选择。

## 基本使用

基础输入框组件。

<code src="./demos/demo1.tsx"></code>

## 禁用

通过 `disabled` 禁用输入框

<code src="./demos/demo7.tsx"></code>

## 密码框

密码框

<code src="./demos/demo2.tsx"></code>

## 可清空

配置 `showClear` 可清空文本。

<code src="./demos/demo3.tsx"></code>

## 数字框

通过 `type = num` 配置数字输入框。

<code src="./demos/demo4.tsx"></code>

## 受控输入框

通过 `value` 使输入框受控。

<code src="./demos/demo5.tsx"></code>

## API

| 属性           | 类型                | 默认值 | 必填  | 说明                                         |
| -------------- | ------------------- | ------ | ----- | -------------------------------------------- |
| className      | string              | -      | false | 自定义 CSS class                             |
| style          | CSSProperties       | -      | false | 自定义样式                                   |
| width          | string、number      | -      | 200   | 输入框长度                                   |
| type           | text、password、num | text   | false | 输入框类型                                   |
| disabled       | boolean             | false  | false | 输入框禁用                                   |
| placeholder    | string              | -      | false | 提示                                         |
| showClear      | boolean             | -      | false | 是否展示清除安娜                             |
| showTogglePwd  | boolean             | -      | false | 显示密码切换按钮(需同时设置 type="password") |
| min            | number              | -      | false | 数字框最小值                                 |
| max            | number              | -      | false | 数字框最大值                                 |
| step           | number              | 1      | false | 数字框递增/减值                              |
| maxLength      | number              | -      | false | 文本域内容最大长度                           |
| showCount      | boolean             | -      | false | 是否展示字数                                 |
| onChange       | Function            | -      | false | 输入框内容改变回调                           |
| onFocus        | Function            | -      | false | 输入框获取焦点回调                           |
| onClick        | Function            | -      | false | 点击输入框回调                               |
| onBlur         | Function            | -      | false | 输入框失去焦点回调                           |
| onKeyDown      | Function            | -      | false | 键盘按下回调                                 |
| onNumberChange | Function            | -      | false | 数字框内容改变回调                           |
| onClear        | Function            | -      | false | 清除输入框内容回调                           |
| defaultValue   | string              | -      | false | 输入框默认值                                 |
| value          | string              | -      | false | 输入框的值                                   |

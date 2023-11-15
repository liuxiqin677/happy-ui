---
title: Alert 警告提示
nav:
  path: /components
group:
  title: 反馈
  order: 3
mobile: false
toc: content
---

# Alert

警告提示，展现需要关注的信息。

何时使用

- 当某个页面需要向用户显示警告的信息时。
- 非浮层的静态展现形式，始终展现，不会自动消失，用户可以点击关闭。

## 基本使用

最简单的用法，适用于简短的警告提示

<code src="./demos/demo1.tsx"></code>

## 四种样式

共有四种样式 `success`、`info`、`warning`、`error`。

<code src="./demos/demo2.tsx"></code>

## 含有辅助性文字介绍

含有辅助性文字介绍的警告提示

<code src="./demos/demo3.tsx"></code>

## 可关闭的警告提示

显示关闭按钮，点击可关闭警告提示

<code src="./demos/demo4.tsx"></code>

## 图标

可口的图标让信息类型更加醒目

<code src="./demos/demo5.tsx"></code>

## 顶部公告

页面顶部通告形式，默认有图标且`type` 为 `warning`。

<code src="./demos/demo6.tsx"></code>

## 操作

可以在右上角自定义操作项。

<code src="./demos/demo7.tsx"></code>

## API

| 属性        | 类型                                  | 默认值                                 | 必填  | 说明                         |
| ----------- | ------------------------------------- | -------------------------------------- | ----- | ---------------------------- | -------------------------------------- |
| icon        | ReactNode                             | -                                      | false | 自定义 icon                  |
| type        | 'success'、'info'、'warning'、'error' | 'info'；当 banner 为 true 时是 warning | false | 警告提示类型                 |
| message     | string                                | -                                      | false | 消息                         |
| description | string                                | -                                      | false | 描述                         |
| action      | ReactNode                             | -                                      | false | 自定义操作                   |
| closable    | boolean                               | false                                  | false | 是否展示关闭按钮             |
| closeIcon   | ReactNode                             | boolean                                | false | false                        | 默认不展示关闭按钮，也可以自定义关按钮 |
| showIcon    | boolean                               | -                                      | false | 是否显示默认 icon            |
| banner      | boolean                               | -                                      | false | 是否是 banner 类型的警告提示 |
| onClose     | Function                              | -                                      | false | 关闭警告提示的回调           |

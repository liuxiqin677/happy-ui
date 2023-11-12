---
title: Notification 通知提醒框
nav:
  path: /components
group:
  title: 反馈
  order: 3
mobile: false
toc: content
---

# Notification 通知提醒框
全局展示通知提醒信息。

## 何时使用
在系统四个角显示通知提醒信息。经常用于以下情况：

- 较为复杂的通知内容。
- 带有交互的通知，给出用户下一步的行动点。
- 系统主动推送。

## 基本使用

基本使用

<code src='./demos/demo1.tsx'></code>

## 四种类型1

通过 `type` 指定 notification 的类型

<code src='./demos/demo2.tsx'></code>

## 四种类型2

你也可以通过对应的 API 方法来渲染四种类型的 notification

<code src='./demos/demo3.tsx'></code>

## 延迟关闭

设置 `duration` 来延迟关闭 notification；当值是 `0` 时，永不关闭

<code src='./demos/demo4.tsx'></code>

## 自定义底部

设置 `footer` 自定义底部

<code src='./demos/demo5.tsx'></code>

## 位置

设置 `placement` 定义位置

<code src='./demos/demo1.tsx'></code>

## 自定义样式

设置 `style` 或者 `className` 自定义样式

<code src='./demos/demo6.tsx'></code>


## 自定义图标

设置 `icon` 自定义图标

<code src='./demos/demo7.tsx'></code>

## API
- `Notification.open(config)`
- `Notification.error(config)`
- `Notification.warn(config)`
- `Notification.success(config)`
- `Notification.destory(key: string)`

config 参数如下：
| 属性 | 类型               | 默认值   | 必填 | 说明 |
| ---- | ------------------| -------- | ---- | ---- |
| className | string | - |  false  | 自定义 className
| style | CSSProperties | - | false | 自定义 style
| type | info、warning、success、error | info | false | 类型
| closeIcon | ReactNode | - | false | 自定义关闭图标
| description | ReactNode | - | true | 通知框内容，`必传`
| duration | number | 4.5 | false | 延迟关闭时间，为 `0` 时不关闭，默认是 `4.5s`
| icon | ReactNode | - | false | 自定义左上角图标
| key | string | - | true | 通知框唯一key，`必传`
| message | ReactNode | - | true | 通知框内容标题，`必传`
| placement | topLeft、topRight、bottomLeft、bottomRight | topRight | false | 通知框内位置
| footer | ReactNode | - | false | 自定义底部
| onClick | Function | - | false | 点击通知时触发的回调函数
| onClose | Function | - | false | 当通知关闭时触发

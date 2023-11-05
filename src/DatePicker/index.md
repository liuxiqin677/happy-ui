---
title: DatePicker 日期选择器
nav:
  path: /components
group:
  title: 数据录入
  order: 4
mobile: false
toc: content
---

# DatePicker 日期选择器 
当用户需要日期，可以点击标准输入框，弹出日期面板进行选择。

## 基本使用

最简单的用法

<code src="./demos/demo1.tsx"></code>

## 指定宽高

通过设定 `width`和 `height` 设置日期选择器的宽高

<code src="./demos/demo2.tsx"></code>

## 初始化选中日期

你可以指定 `value` 来控制日期选择器的初始化

<code src="./demos/demo3.tsx"></code>

## 设置星期的排序

你可以指定 `startDay` 来指定星期的排序

<code src="./demos/demo4.tsx"></code>


## API
| 属性 | 类型               | 默认值   | 必填 | 说明 |
| ---- | ------------------| -------- | ---- | ---- |
| value | Date |  new Date()  | false | 初始化日期
| width | number、string |  300  | false | 日期选择器宽度
| height | number、string |  250  | false | 日期选择器高度
| style | CSSProperties |  -  | false | 自定义样式
| className | string |  -  | false | 自定义类名
| startWeekDay | 'Mon'、'Tue'、'Wed'、'Thu'、'Fri'、'Sat'、'Sun' |  'Sun'  | false | 指定星期的排列顺序
| onChange | (date:Date) => void |  -  | false | 选择日期的回调

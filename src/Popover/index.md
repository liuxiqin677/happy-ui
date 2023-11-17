---
title: Popover 气泡卡片
nav:
  path: /components
group:
  title: 数据展示
  order: 5
mobile: false
toc: content
---

# Popover 气泡卡片

点击/鼠标移入元素，弹出气泡式的卡片浮层。

## 何时使用

当目标元素有进一步的描述和相关操作时，可以收纳到卡片中，根据用户的操作行为进行展现。

## 基本使用

最简单的用法，浮层的大小由内容区域决定。

<code src='./demos/demo1.tsx'></code>

## 四个位置

设置 `placement` 设置四个位置

<code src='./demos/demo2.tsx'></code>

## 点击触发

设置 `trigger = click` 点击时显示 popover

<code src='./demos/demo3.tsx'></code>

## 自定义内容

设置 `trigger = click` 点击时显示 popover

<code src='./demos/demo4.tsx'></code>

## API

| 属性      | 类型                       | 默认值 | 必填  | 说明             |
| --------- | -------------------------- | ------ | ----- | ---------------- |
| className | string                     | -      | false | 自定义 CSS class |
| style     | CSSProperties              | -      | false | 自定义 style     |
| content   | ReactNode                  | -      | false | 内容             |
| title     | ReactNode                  | -      | false | 标题             |
| placement | left、right、top、bottom   | left   | false | 位置             |
| trigger   | hover、click               | hover  | false | 触发方式         |
| active    | boolean                    | false  | false | 初始化是否可见   |
| onChange  | (visible: boolean) => void | -      | false | 状态更改的回调   |

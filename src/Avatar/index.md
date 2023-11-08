---
title: Avatar 头像
nav:
  path: /components
group:
  title: 数据展示
  order: 5
mobile: false
toc: content
---

# Avatar 头像
用作头像显示，可以为图片、图标或字符形式展示。

## 基本使用

头像的基础使用

<code src="./demos/demo1.tsx"></code>

## 大小和形状

配置 size 参数改变大小，默认为 40px; 配置 shape:square 设置为方形头像。

<code src="./demos/demo2.tsx"></code>

## 头像组

使用 AvatarGroup 可以使用头像组功能，可通过 size 指定头像的大小，通过 style 为每个头像配置共同样式，如间距。

<code src="./demos/demo3.tsx"></code>

## 交互

可以通过 triggerIcon、triggerType 来定制交互按钮，类型有 mask (遮罩) 和 button (按钮) 两种，通过 onClick 参数来添加回调。

<code src="./demos/demo4.tsx"></code>

## 文本自适应

配置 autoFixFontSize，对不确定文本内容长度的头像进行自适应，撑满头像，默认 true。

<code src="./demos/demo5.tsx"></code>

## API

| 属性 | 类型               | 默认值   | 必填 | 说明 |
| ---- | ------------------| -------- | ---- | ---- |
| className | string | - |  false  | 自定义类名
| style | CSSProperties | - |  false  | 自定义stylee
| size | number | 40 |  false  | 头像大小 
| shape | 'circle'、'square' | 'circle' |  false  | 头像形状 
| autoFixFontSize | boolean | true |  false  | 文本自适应 
| triggerType | 'mask'、'button' | 40 |  false  | 头像交互方式 
| triggerIcon | ReactNode | - |  false  | 自定义头像交互按钮 
| triggerClick | Function | - |  false  | 头像点击回调 

## Avatar Group API
| 属性 | 类型               | 默认值   | 必填 | 说明 |
| ---- | ------------------| -------- | ---- | ---- |
| className | string | - |  false  | 自定头像组义类名
| groupStyle | CSSProperties | - |  false  | 自定义头像组stylee
| size | number | 40 |  false  | 每一个头像的大小 
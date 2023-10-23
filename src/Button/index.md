---
title: Button 按钮 
nav:
  path: /components
group:
  title: 通用
  order: 1
mobile: false
toc: content
---

# Button

按钮用于开始一个即时操作。

## 五种类型的按钮

按钮有五种类型：主要按钮、次按钮、虚线按钮、文本按钮和链接按钮。主按钮在同一个操作区域最多出现一次。

<code src="./demos/demo1.tsx"></code>

## 按钮尺寸

按钮有大、中、小三种尺寸。通过设置 size 为 large small 分别把按钮设为大、小尺寸。若不设置 size，则尺寸为中。

<code src="./demos/demo2.tsx"></code>

## 不可用状态

添加 disabled 属性即可让按钮处于不可用状态，同时按钮样式也会改变。

<code src="./demos/demo3.tsx"></code>

## 图标按钮

当需要在 Button 内嵌入 Icon 时，可以设置 icon 属性，或者直接在 Button 内使用 Icon 组件。如果想控制 Icon 具体的位置，只能直接使用 Icon 组件，而非 icon 属性。

<code src="./demos/demo4.tsx"></code>

## 加载中状态

添加 loading 属性即可让按钮处于加载状态，第二个按钮演示点击后进入加载状态。

<code src="./demos/demo5.tsx"></code>

## 危险按钮

危险是一种按钮属性而不是按钮类型

<code src="./demos/demo6.tsx"></code>

## 幽灵按钮

幽灵按钮将按钮的内容反色，背景变为透明，常用在有色背景上。

<code src="./demos/demo7.tsx"></code>

## Block 按钮

设置 `block` 属性使按钮适应父元素宽度

<code src="./demos/demo8.tsx"></code>


## API
| 属性 | 类型               | 默认值   | 必填 | 说明 |
| ---- | ------------------| -------- | ---- | ---- |
| type | 'primary'、'default'、'dashed'、'text'、'link' | 'default' |  false  | 按钮类型 
| className | string | - |  false  | 传入的类名
| style | CSSProperties | - |  false  | 传入的内联样式
| onClick | (event: MouseEvent) => void; | - |  false  | 点击按钮时的回调
| size | 'small'、'default'、'large' | 'default' |  false  | 按钮大小
| disabled | boolean | false |  false  | 按钮是否禁用
| loading | boolean | false |  false  | 按钮是否处于加载中状态
| icon | ReactNode | - |  false  | 按钮图标
| danger | boolean | false |  false  | 设置危险按钮	
| ghost | boolean | false |  false  | 幽灵属性，使按钮背景透明	


## 思路
Button 组件的思路很简单, 最主要的就是根据不同的状态设置不同的样式即可
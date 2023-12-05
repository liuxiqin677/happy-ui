---
title: Empty 空状态
nav:
  path: /components
group:
  title: 数据展示
  order: 5
mobile: false
toc: content
---

# Empty 空状态

指当前场景没有对应的数据内容，呈现出的一种状态。

## 基本使用

基础用法。

<code src="./demos/demo1.tsx"></code>

## 自定义图标

通过 `icon` ，配置自定义图标。

<code src="./demos/demo2.tsx"></code>

## 自定义文案

通过 `description` ，配置自定义文案。

<code src="./demos/demo3.tsx"></code>

## API

| 属性        | 类型          | 默认值 | 必填  | 说明           |
| ----------- | ------------- | ------ | ----- | -------------- |
| className   | string        | -      | false | 传入的类名     |
| style       | CSSProperties | -      | false | 传入的内联样式 |
| icon        | ReactNode     | -      | false | 自定义图标     |
| description | ReactNode     | -      | false | 自定义文案     |

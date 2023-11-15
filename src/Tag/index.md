---
title: Tag 标签
nav:
  path: /components
group:
  title: 数据展示
  order: 5
mobile: false
toc: content
---

# Tag 标签

进行标记和分类的小标签。

## 何时使用

- 用于标记事物的属性和维度。
- 进行分类。

## 基本使用

基本使用

<code src='./demos/demo1.tsx'></code>

## 多彩标签

通过 `color` 设置多彩标签。Tag 内置了一些多彩标签 。如果你想自定义，直接传入自定义 `color` 即可

<code src='./demos/demo2.tsx'></code>

## 五种状态

通过 `color` 也设置五种状态标签

<code src='./demos/demo3.tsx'></code>

## 图标按钮

设置 `icon` 来设置图标按钮

<code src='./demos/demo4.tsx'></code>

## 关闭标签

设置 `closeable` 可以关闭标签。传入 `onClose` 可以在关闭标签后调用

<code src='./demos/demo5.tsx'></code>

## API

| 属性      | 类型                          | 默认值 | 必填  | 说明                                      |
| --------- | ----------------------------- | ------ | ----- | ----------------------------------------- |
| className | string                        | -      | false | 传入的类名                                |
| style     | CSSProperties                 | -      | false | 传入的内联样式                            |
| closeable | boolean                       | false  | false | 标签是否可以关闭                          |
| color     | string                        | -      | false | 多彩标签                                  |
| icon      | ReactNode                     | -      | false | 设置前缀图标                              |
| bordered  | boolean                       | true   | false | 是否有边框                                |
| onClose   | (e: React.MouseEvent) => void | -      | false | 关闭标签的回调。需要配合 `closeable` 使用 |

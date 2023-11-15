---
title: Skeleton 骨架屏
nav:
  path: /components
group:
  title: 反馈
  order: 3
mobile: false
toc: content
---

# Skeleton

在需要等待加载内容的位置提供一个占位图形组合。

## 何时使用

- 网络较慢，需要长时间等待加载处理的情况下。
- 图文信息内容较多的列表/卡片中。
- 只在第一次加载数据的时候使用。
- 可以被 Spin 完全代替，但是在可用的场景下可以比 Spin 提供更好的- 视觉效果和用户体验。

## 代码演示

### 基本使用

最简单的展位效果

<code src='./demos/demo1.tsx'></code>

### 复杂的组合

更复杂的组合。

<code src='./demos/demo2.tsx'></code>

### 动画效果

显示动画效果。

<code src='./demos/demo3.tsx'></code>

### 包含子组件

加载占位图包含子组件。

<code src='./demos/demo4.tsx'></code>

### 头像

骨架按钮、头像、输入框、图像和自定义节点。

<code src='./demos/demo5.tsx'></code>

## API

### Skeleton

| 属性    | 类型                            | 默认值 | 必填                                                                        | 说明             |
| ------- | ------------------------------- | ------ | --------------------------------------------------------------------------- | ---------------- |
| active  | boolean                         | false  | false                                                                       | 是否展示动画效果 |
| loading | boolean                         | -      | 为 true 时，显示占位图。反之则直接展示子组件                                |
| avatar  | boolean、`ISkeletonAvatarProps` | false  | 是否显示头像占位图                                                          |
| title   | boolean、`ISkeletonTitleProps`  | true   | 是否显示标题占位图                                                          |
| rows    | number                          | 3      | 展示几行 paragraph，默认 3 行                                               |
| width   | number[]、string[]              | []     | 每行 paragraph 的长度，数字是 `${value}px`，字符串需要指定单位；默认 100%。 |

### Skeleton.Avatar（ISkeletonAvatarProps）

| 属性   | 类型                                | 默认值    | 必填                 | 说明                                                    |
| ------ | ----------------------------------- | --------- | -------------------- | ------------------------------------------------------- |
| active | boolean                             | false     | false                | 是否展示动画效果，仅在单独使用 `Skeleton.Avatar` 时生效 |
| shape  | 'circle'、'square'                  | 'circle'  | 指定头像的形状       |
| size   | number、'large'、'small'、'default' | 'default' | 设置头像占位图的大小 |

### ISkeletonTitleProps

| 属性  | 类型           | 默认值 | 必填  | 说明                 |
| ----- | -------------- | ------ | ----- | -------------------- |
| width | number、string | -      | false | 设置标题占位图的宽度 |

### Skeleton.Button

| 属性   | 类型                        | 默认值    | 必填                           | 说明             |
| ------ | --------------------------- | --------- | ------------------------------ | ---------------- |
| active | boolean                     | false     | false                          | 是否展示动画效果 |
| shape  | 'circle'、'square'、'round' | 'circle'  | 指定按钮的形状                 |
| size   | 'large'、'small'、'default' | 'default' | 设置按钮的大小                 |
| block  | boolean                     | false     | 将按钮宽度调整为其父宽度的选项 |

### Skeleton.Input

| 属性   | 类型                        | 默认值    | 必填                             | 说明             |
| ------ | --------------------------- | --------- | -------------------------------- | ---------------- |
| active | boolean                     | false     | false                            | 是否展示动画效果 |
| size   | 'large'、'small'、'default' | 'default' | 设置输入框的大小                 |
| block  | boolean                     | false     | 将输入框宽度调整为其父宽度的选项 |

### Skeleton.Image

| 属性   | 类型    | 默认值 | 必填  | 说明             |
| ------ | ------- | ------ | ----- | ---------------- |
| active | boolean | false  | false | 是否展示动画效果 |

---
title: CheckBox 多选框
nav:
  path: /components
group:
  title: 数据录入
  order: 4
mobile: false
toc: content
---

# CheckBox 多选框

多选框。

## 何时使用

- 在一组可选项中进行多项选择时；
- 单独使用可以表示两种状态之间的切换，和 switch 类似。区别在于切换 switch 会直接触发状态改变，而 checkbox 一般用于状态标记，需要和提交操作配合。

## 基本使用

简单的 CheckBox

<code src='./demos/demo1.tsx'></code>

## 禁用

设置 `disabled` 禁用

<code src='./demos/demo2.tsx'></code>

## CheckBox 组

方便的从数组生成 Checkbox 组。

<code src='./demos/demo3.tsx'></code>

## 禁用 CheckBox 组

禁用 CheckBox 组

<code src='./demos/demo4.tsx'></code>

## 禁用 CheckBox 组的某一项

禁用 CheckBox 组的某一项

<code src='./demos/demo5.tsx'></code>

## 全选

全选 CheckBox 的每一项

<code src='./demos/demo6.tsx'></code>

## API

### CheckBox

| 属性      | 类型                        | 默认值 | 必填  | 说明             |
| --------- | --------------------------- | ------ | ----- | ---------------- |
| className | string                      | -      | false | 自定义 CSS class |
| style     | CSSProperties               | -      | false | 自定义样式       |
| checked   | boolean                     | false  | false | 选中状态         |
| disabled  | boolean                     | false  | false | 禁用             |
| onChange  | (checked: boolean) => void; | -      | false | 选择后的回调     |

### CheckBox.Group

| 属性         | 类型                                           | 默认值 | 必填  | 说明         |
| ------------ | ---------------------------------------------- | ------ | ----- | ------------ |
| defaultValue | string[] 、 number[]                           | -      | false | 默认选中的项 |
| disabled     | boolean                                        | false  | false | 禁用         |
| options      | string[]、number[]、Option[]                   | -      | true  | 选项         |
| onChange     | (checkedValue: Array<string、number>) => void; | -      | false | 选择后的回调 |

### Option

```ts
interface Option {
  label: string;
  value: string;
  disabled?: boolean;
}
```

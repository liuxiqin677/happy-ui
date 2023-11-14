---
title: Form 表单
nav:
  path: /components
group:
  title: 数据录入
  order: 4
mobile: false
toc: content
---

# Form 表单
具有收集数据、校验和提交功能的表单

## 基本使用

表单的基本使用，你可以通过 `layout` 指定表单布局方式

<code src="./demos/demo1.tsx"></code>

## 受控表单
- 首先通过 `useRef` 创建 ref
- 再配置 Form.Item 的 `field` 字段，让表单项成为受控组件。`filed` 字段不能重复
- 最后，通过 `ref.current.sumbit()` 获取表单值以及自动校验；你也可以手动出发 `validateFileds` 对表单进行校验

<code src="./demos/demo2.tsx"></code>

## 表单重置
使用 `Form.useForm().resetFields` 对表单重置

<code src="./demos/demo3.tsx"></code>

## 表单禁用
使用 `disabled` 禁用表单

<code src="./demos/demo4.tsx"></code>

## 表单项禁用
设置  `Form.Item` 的 `disabled` 禁用表单项

<code src="./demos/demo5.tsx"></code>

## 注册表单案例
注册表单案例

<code src="./demos/demo6.tsx"></code>
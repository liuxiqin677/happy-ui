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

设置 `Form.Item` 的 `disabled` 禁用表单项

<code src="./demos/demo5.tsx"></code>

## 注册表单案例

注册表单案例

<code src="./demos/demo6.tsx"></code>

## API

### Form

| 属性      | 类型                 | 默认值     | 必填  | 说明             |
| --------- | -------------------- | ---------- | ----- | ---------------- |
| className | string               | -          | false | 自定义 CSS class |
| style     | CSSProperties        | -          | false | 自定义样式       |
| layout    | horizontal、veritcal | horizontal | false | 表单布局         |
| disabled  | boolean              | false      | false | 禁用表单         |

### FormItem

| 属性       | 类型            | 默认值 | 必填  | 说明                                     |
| ---------- | --------------- | ------ | ----- | ---------------------------------------- |
| className  | string          | -      | false | 自定义 CSS class                         |
| style      | CSSProperties   | -      | false | 自定义样式                               |
| label      | string          | -      | false | 表单项标签                               |
| disabled   | boolean         | false  | false | 禁用表单项                               |
| wrapperCol | number          | 0      | false | 单行距离顶部 Item 距离                   |
| wrapperTol | number          | 0      | false | 单行距离底部 Item 距离                   |
| field      | string          | -      | false | `受控表单时必传`，每一个表单项的唯一名称 |
| rules      | Array<ruleType> | -      | false | 单行校验规则                             |

## ruleType

```ts
type ruleType = {
  required?: boolean; //是否必填
  maxLength?: number; // 最大长度
  minLength?: number; // 最小长度
  message: string; // 校验不通过的提示信息
  fn?: Function; // 自定义校验函数
};
```

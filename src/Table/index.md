---
title: Table 表格
nav:
  path: /components
group:
  title: 数据展示
  order: 5
mobile: false
toc: content
---

# Table 表格

用于数据收集展示、分析整理、操作处理。

## 基础表格

表格的基本使用，必须传 `columns`、`data`

<code src="./demos/demo1.tsx"></code>

## 对齐方式

设置 `align` 调整内容对齐方式。默认是 `left`

<code src="./demos/demo2.tsx"></code>

## 展开行

设置 `expandedRowRender` 对展开行进行配置

<code src="./demos/demo3.tsx"></code>

## 单选

配置 `radio` 以支持单选，`onRadioCallback` 获取选择结果。

<code src="./demos/demo4.tsx"></code>

## 多选

配置 `checked` 以支持多选，`onCheckedCallback` 获取选择结果。

<code src="./demos/demo5.tsx"></code>

## 排序

`columns` 每一项配置 `sorter`，默认排序设定值为 `true` 即可，自定义排序可设定为数组，`0` 下标位表示升序规则，`1` 下标位表示降序规则。
配合 `sortable` 使用

<code src="./demos/demo6.tsx"></code>

## 自定义渲染

`columns` 定义 `render` 自定义渲染

<code src="./demos/demo7.tsx"></code>

## 虚拟列表滚动

`virtualListNum` 表示固定列展示的数据条数，默认 10 条，通过 `virtualized` 开启虚拟列表。

<code src="./demos/demo8.tsx"></code>

## 懒加载

`virtualListNum` 表示初始展示条数，默认 10 条，通过 lazyLoad 开启懒加载。

<code src="./demos/demo9.tsx"></code>

## 分页

通过 `pagination` 开启分页，通过 `paginationAlign` 改变分页对齐方式。

<code src="./demos/demo10.tsx"></code>

## 注意事项

虚拟列表、懒加载、分页只能选择其一使用

## API

| Name               | Description                                                 | Type                        | Default                                  |
| ------------------ | ----------------------------------------------------------- | --------------------------- | ---------------------------------------- |
| className          | 自定义类名                                                  | `string`                    | `--`                                     |
| style              | 自定义样式                                                  | `CSSProperties`             | `--`                                     |
| columns            | 表头配置项                                                  | `Array<TTableThType>`       | `[]`                                     |
| data               | 表内容配置项                                                | `Array<string>`             | `[]`                                     |
| align              | 表格对齐方式                                                | `left`、`right`、`center`   | `left`                                   |
| width              | 列宽                                                        | `number`                    | `auto`                                   |
| expandedRowRender  | 展开行                                                      | `Function`                  | `接受自定义参数，回调函数传入展开行内容` |
| radio              | 单选                                                        | `boolean`                   | `false`                                  |
| checked            | 多选                                                        | `boolean`                   | `false`                                  |
| onRadioCallback    | 单选回调                                                    | `Function`                  | `--`                                     |
| onCheckedCallback  | 多选回调                                                    | `Function`                  | `--`                                     |
| sortable           | 支持排序                                                    | `boolean`                   | `--`                                     |
| filter             | 支持筛选                                                    | `boolean`                   | `false`                                  |
| sorter             | 表头中的排序规则，true 采用列默认排序，Array 采用自定义排序 | `boolean / Array<Function>` | `--`                                     |
| virtualized        | 虚拟列表                                                    | `boolean`                   | `false`                                  |
| virtualListNum     | 懒加载、虚拟列表默认展示数据条数                            | `number`                    | `10`                                     |
| lazyLoad           | 懒加载                                                      | `false`                     |
| pagination         | 分页                                                        | `boolean`                   | `false`                                  |
| paginationAlign    | 分页器对齐方式                                              | `left`、`right`、`center`   | `right`                                  |
| pageSizeOption     | 分页器每页展示配置                                          | `Array<number>`             | `[10, 20, 30, 50]`                       |
| onPageNumberChange | 分页器改变页码回调函数                                      | `Function`                  | `--`                                     |
| onPageSizeChange   | 分页器改变每页数量回调函数                                  | `Function`                  | `--`                                     |

## TTableThType

| Name      | Description | Type                                          | Default |
| --------- | ----------- | --------------------------------------------- | ------- |
| title     | 标题        | `string / number`                             | `--`    |
| dataIndex | 索引值      | `string / number`                             | `--`    |
| width     | 宽度        | `string`                                      | `--`    |
| sorter    | 排序规则    | `boolean / Array<Function> / number / string` | `--`    |
| filter    | 筛选规则    | `boolean / string`                            | `--`    |

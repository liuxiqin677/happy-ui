---
title: Pagination 分页器
nav:
  path: /components
group:
  title: 导航
  order: 2
mobile: false
toc: content
---

# Pagination 分页器

采用分页的形式分隔长列表，每次只加载一个页面。

## 何时使用

- 当加载/渲染所有数据将花费很多时间时；
- 可切换页码浏览数据。

## 基本使用

分页器的基本使用

<code src='./demos/demo1.tsx'></code>

## 更多

更多分页

<code src='./demos/demo2.tsx'></code>

## 跳转

跳转

<code src='./demos/demo3.tsx'></code>

## API

| 属性             | 类型                                     | 默认值         | 必填  | 说明                                                       |
| ---------------- | ---------------------------------------- | -------------- | ----- | ---------------------------------------------------------- |
| className        | string                                   | -              | false | 自定义 className                                           |
| style            | CSSProperties                            | -              | false | 自定义 style                                               |
| current          | number                                   | -              | false | 当前页                                                     |
| defaultCurrent   | number                                   | 1              | false | 默认当前页                                                 |
| defaultPageSize  | number                                   | 10             | false | 默认每页条数                                               |
| pageSize         | number                                   | -              | false | 每页条数                                                   |
| pageSizeOptions  | number[]                                 | [10,20,50,100] | false | 指定每页可以显示多少条                                     |
| showSizeChanger  | boolean                                  | false          | false | 是否展示切换器，total 大于 50 时默认 true                  |
| total            | number                                   | -              | true  | 总条数，必传                                               |
| size             | 'defalut' 、 'small'                     | 'default'      | false | 分页器大小                                                 |
| showQuickJumper  | boolean                                  | false          | false | 是否可以快速跳转至某页                                     |
| onChange         | (page: number, pageSize: number) => void | -              | false | 页码或 `pageSize` 改变的回调，参数是改变后的页码及每页条数 |
| onShowSizeChange | (current: number, size: number) => void  | -              | false | pageSize 变化的回调                                        |

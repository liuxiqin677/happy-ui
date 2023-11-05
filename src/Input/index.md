---
title: Input 输入框
nav:
  path: /components
group:
  title: 数据录入
  order: 4
mobile: false
toc: content
---

# Input
通过鼠标或键盘输入内容，是最基础的表单域的包装。

何时使用
- 需要用户输入表单域内容时。
- 提供组合型输入框，带搜索的输入框，还可以进行大小选择。

```jsx
/**
 * title: 基本使用
 * description: 基本使用
 */
import React from 'react';
import { Space, Input } from 'happy-ui';

export default () => {
  return (
    <Space>
      <Input 
        placeholder="please input..."
      />
    </Space>
  )
}
```

```jsx
/**
 * title: 三种大小
 * description: 我们为输入框定义了三种尺寸（大、默认、小），高度分别为 40px、32px 和 24px。
 */
import React from 'react';
import { Space, Input } from 'happy-ui';

export default () => {
  return (
    <Space direction='vertical' size={16}>
      <Input 
        size='large'
        placeholder="please input..."
      />
      <Input 
        size='middle'
        placeholder="please input..."
      />
      <Input 
        size='small'
        placeholder="please input..."
      />
    </Space>
  )
}
```

```jsx
/**
 * title: 禁用 去除边框
 * description: 禁用 Input 和 去除边框
 */
import React from 'react';
import { Input, Space } from 'happy-ui';

export default () => {
  return (
    <Space direction='vertical'>
      <Input 
        placeholder="please input..."
        disabled
      />
      <Input 
        placeholder="please input..."
        bordered={false}
      />
    </Space>
  )
}
```

```jsx
/**
 * title: 受控组件
 * description: 你可以通过绑定 value 来使得 Input 框成为受控组件
 */
import React, { useState } from 'react';
import { Input, Space } from 'happy-ui';

export default () => {
  const [value, setValue] = useState('');

  const handleChange = (value) => {
    setValue(value);
  }

  return (
    <Space direction='vertical'>
      <span>
        输入的值是: {value}
      </span>
      <Input 
        placeholder="please input..."
        value={value}
        onChange={handleChange}
      />
    </Space>
  )
}
```


```jsx
/**
 * title: 前置/后置标签
 * description: 用于配置一些固定组合.
 */
import React from 'react';
import { Input, Space } from 'happy-ui';

export default () => {

  return (
    <Space direction='vertical'>
      <Input 
        placeholder="please input..."
        defaultValue='mySite'
        addonBefore="http://" 
        addonAfter=".com"
      />
      <Input 
        defalutValue='mySite'
        placeholder="please input..."
        addonAfter=".com"
      />
      <Input 
        defalutValue='mySite'
        placeholder="please input..."
        addonBefore="http://"
      />
    </Space>
  )
}
```

```jsx
/**
 * title: 显示长度
 * description: 显示输入框内容的长度.
 */
import React from 'react';
import { Input, Space } from 'happy-ui';

export default () => {

  return (
    <Space direction='vertical'>
      <Input 
        placeholder="please input..."
        showCount
      />
      <Input
        placeholder="please input..."
        showCount
        maxLength={20}
      />
      <Input
        placeholder="please input..."
        showCount
        addonAfter=".com"
      />
      <Input
        placeholder="please input..."
        showCount
        addonBefore="http://"
      />
      <Input
        placeholder="please input..."
        showCount
        maxLength={20}
        addonBefore="http://"
        addonAfter=".com"
      />
    </Space>
  )
}
```

```jsx
/**
 * title: 文本域
 * description: 用于多行输入
 */
import React from 'react';
import { Input, Space } from 'happy-ui';

export default () => {

  return (
    <Space direction='vertical'>
      <Input type='textarea' />
      <Input type='textarea' showCount />
    </Space>
  )
}
```

```jsx
/**
 * title: 文本域大小
 * description: 设置 cols rows 文本域的大小
 */
import React from 'react';
import { Input, Space } from 'happy-ui';

export default () => {

  return (
    <Space>
      <Input type='textarea' cols={30} rows={20} />
      <Input type='textarea' cols={5} rows={5}/>
    </Space>
  )
}
```

```jsx
/**
 * title: 改变文本域大小
 * description: 设置 resizeable 是否可以拖拽改变文本域大小
 */
import React from 'react';
import { Input, Space } from 'happy-ui';

export default () => {

  return (
    <Space>
      <Input type='textarea' />
      <Input type='textarea' resizeable={false}/>
    </Space>
  )
}
```

## API
| 属性 | 类型               | 默认值   | 必填 | 说明 |
| ---- | ------------------| -------- | ---- | ---- |
| type | 'input'、'textarea' | 'input' |  false  | 输入框类型 
| addonAfter | ReactNode、string; | - |  false  | 前缀
| addonBefore | ReactNode、string | - |  false  | 后缀
| placeholder | string | - |  false  | 输入提示
| bordered | boolean | true |  false  | 是否有边框
| disabled | boolean | false |  false  | 是否禁用
| id | string | - |  false  | 输入框的id
| maxLength | number | - |  false  | 内容的最大长度
| showCount | boolean | false |  false  | 是否展示字数	
| styles | CSSProperties | - |  false  | 输入框内敛样式
| className | string | - |  false  | 类名
| size | 'large'、'middle'、'small' | 'large' |  false  | 输入框大小
| value | string | - |  false  | 输入框的值
| onChange | (value: string) => void | - |  false  | 输入框值改变的回调
| cols | number | - |  false  | 文本域行的字数
| rows | number | 4 |  false  | 文本域列的字数
| resizeable | boolean | - |  false  | 是否可以拖动改变文本域

## 思路
Input 组件我认为稍微麻烦点的是**当同时设定了 showCount、addonAfter、addonBefore 时的样式**，其他倒没什么


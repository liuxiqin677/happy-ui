---
title: InputNumber 数字输入框
nav:
  path: /components
group:
  title: 数据录入
  order: 4
mobile: false
toc: content
---

# InputNumber
通过鼠标或键盘，输入范围内的数值。

何时使用
- 当需要获取标准数值时。

```jsx
/**
 * title: 基本使用
 * description: 数字输入框
 */
import React from 'react';
import { InputNumber, Space } from 'happy-ui';

export default () => {
  const onChange = (value: number) => {
    console.log(value);
  }

  return (
    <Space>
      <InputNumber 
        defaultValue={3}
        onChange={onChange}
      />
    </Space>
  )
}
```

```jsx
/**
 * title: 三种大小
 * description: 三种大小的数字输入框，当 size 分别为 large 和 small 时，输入框高度为 40px 和 24px ，默认高度为 32px。
 */
import React from 'react';
import { InputNumber, Space } from 'happy-ui';

export default () => {
  const onChange = (value: number) => {
    console.log(value);
  }

  return (
    <Space>
      <InputNumber 
        size="large"
        defaultValue={3}
        onChange={onChange}
      />
      <InputNumber 
        size="middle"
        defaultValue={3}
        onChange={onChange}
      />
      <InputNumber 
        size="small"
        defaultValue={3}
        onChange={onChange}
      />
    </Space>
  )
}
```

```jsx
/**
 * title: 前缀、后缀标签
 * description: 用于配置一些固定组合。
 */
import React from 'react';
import { InputNumber, Space } from 'happy-ui';

export default () => {
  const onChange = (value: number) => {
    console.log(value);
  }

  return (
    <Space>
      <InputNumber 
        defaultValue={3}
        onChange={onChange}
        addonBefore="+" 
        addonAfter="$" 
      />
      <InputNumber 
        defaultValue={3}
        onChange={onChange}
        addonBefore="+" 
      />
      <InputNumber 
        defaultValue={3}
        onChange={onChange}
        addonAfter="$" 
      />
    </Space>
  )
}
```

```jsx
/**
 * title: 禁用
 * description: 点击按钮切换可用状态。
 */
import React, { useState } from 'react';
import { InputNumber, Space, Button } from 'happy-ui';

export default () => {
  const [disabled, setDisabled] = useState(true);
  const onChange = (value: number) => {
    console.log(value);
  }

  return (
    <Space direction='vertical' size={16}>
      <InputNumber 
        disabled={disabled}
        defaultValue={3}
        onChange={onChange}
      />
      <Button type='primary' onClick={() => setDisabled(!disabled)}> Toggle disabled</Button>
    </Space>
  )
}
```

```jsx
/**
 * title: 无边框。
 * description: 没有边框。
 */
import React from 'react';
import { InputNumber, Space } from 'happy-ui';

export default () => {
  const onChange = (value: number) => {
    console.log(value);
  }

  return (
    <Space>
      <InputNumber 
        bordered={false}
        defaultValue={3}
        onChange={onChange}
      />
    </Space>
  )
}
```

```jsx
/**
 * title: 前缀
 * description: 在输入框上添加前缀图标。
 */
import React from 'react';
import { InputNumber, Space } from 'happy-ui';

export default () => {
  const onChange = (value: number) => {
    console.log(value);
  }

  return (
    <Space direction='vertical' size={16}>
      <InputNumber 
        prefix="￥"
        defaultValue={3}
        onChange={onChange}
      />
      <InputNumber 
        prefix="￥"
        defaultValue={3}
        addonBefore="+" 
        onChange={onChange}
      />
      <InputNumber 
        prefix="￥"
        disabled
        defaultValue={3}
        onChange={onChange}
      />
    </Space>
  )
}
```

```jsx
/**
 * title: 键盘快捷键
 * description: 快捷键进行数字输入，传入 onPressEnter 时，回车快捷键生效，传入 onStep 时，上下按钮快捷键生效
 */
import React from 'react';
import { InputNumber, Space } from 'happy-ui';

export default () => {
  const onChange = (value: number) => {
    console.log(value);
  }
  
  const onPressEnter = (value: number | string) => {
    console.log("回车生效了", value)
  }
  
  const onStep = (value: number, info: {offset: number; type: 'up' | 'down'}) => {
    console.log("上下快捷键生效了", value, info)
  }

  return (
    <Space direction='vertical' size={16}>
      <InputNumber 
        defaultValue={3}
        onChange={onChange}
        onPressEnter={onPressEnter}
        onStep={onStep}
      />
    </Space>
  )
}
```

## API
| 属性 | 类型               | 默认值   | 必填 | 说明 |
| ---- | ------------------| -------- | ---- | ---- |
| addonAfter | ReactNode、string | - |  false  | 带标签的 input，设置后置标签 
| addonBefore | ReactNode、string | - |  false  | 带标签的 input，设置前置标签
| controls | boolean | - |  true  | 是否显示增减按钮
| placeholder | string | - |  false  | 输入提示
| bordered | boolean | true |  false  | 是否有边框
| disabled | boolean | false |  false  | 是否禁用
| defaultValue | number | - |  false  | 默认值
| max | number | - |  Number.MAX_SAFE_INTEGER  | 最大值
| min | number | false |  Number.MIN_SAFE_INTEGER  | 最小值	
| prefix | ReactNode、string | - | 带有前缀图标的 input
| styles | CSSProperties | - |  false  | 输入框内敛样式
| className | string | - |  false  | 类名
| size | 'large'、'middle'、'small' | 'large' |  false  | 输入框大小
| step | number | 1 | false | 每次改变步数，可以为小数
| value | number | - |  false  | 输入框的值
| onChange | (value: string 、 number 、 undefined) => void | - |  false  | 输入框值改变的回调
| onPressEnter | (value: string 、 number ) => void | - |  false  | 按下回车的回调
| onStep |  ( value: number, info: { offset: number; type: 'up' 、 'down' }) => void | - |  false  | 点击上下箭头的回调	

## 思路
InputNumber的难点在于输入的时候需要校验是否是数字，如果是，则更新，如果不是，则需要`回滚到上一个合法的值`。

因为我们要确保外部传入的值始终是处于合法状态的，如果不合法则必须回滚到上一个合法的值

当然也要注意越界处理

- 因此 InputNumber 需要维护`三个状态`，内部一个 `currentValue`，然后外部组件传入的 `value`，一个 `prevRef.current`(记录上一次合法的值)

  当输入框的内容改变时，内部调用`verifyBeforeSubmit`方法先去校验值是否合法（正则表达式为`/^-?[1-9]*(\.\d*)?$|^-?0(\.\d*)?$/`），再判断是否越界，即和 max、min 比较，再对其进行小数处理，最好如果合法，则记录最新值，并把最新值暴露出去


  贴上 `verifyBeforeSubmit` 的代码
  ```ts
  // 检验当前输入的值是否合法
  const verifyBeforeSubmit = useCallback(
    (
      inputValue: number | string | undefined, // 当前输入框输入的值
      callback?: (value: any) => any, // 如果合法后，需要执行的回调
    ) => {
      const NUM_PATTERN = /^-?[1-9]*(\.\d*)?$|^-?0(\.\d*)?$/;
      // 校验 inputValue 是否合法，如果不合法，则需回滚到上一次的值，也就是 preValue.current
      if (
        !inputValue ||
        String(inputValue).length === 0 ||
        !NUM_PATTERN.test(String(inputValue)) ||
        (typeof min === 'number' && Number(inputValue) < min) || // 越界
        (typeof max === 'number' && Number(inputValue) > max) // 越界
      ) {
        setCurrentValue(preValue.current || defaultValue);
        return;
      }

      // 如果合法，则去做进一步的处理
      let commitVal = parseFloat(String(inputValue)).toFixed(precision);

      // 默认保留两位小数点
      if (
        typeof min === 'number' &&
        typeof max === 'number' &&
        parseFloat(String(inputValue)) > min &&
        parseFloat(String(inputValue)) < max
      ) {
        commitVal = parseFloat(String(inputValue)).toFixed(precision);
      } else {
        if (typeof min === 'number' && parseFloat(String(inputValue)) <= min) {
          commitVal = String(min);
        } else if (
          typeof max === 'number' &&
          parseFloat(String(inputValue)) >= max
        ) {
          commitVal = String(max);
        }
      }

      // 记录最新的合法的值
      preValue.current = Number(commitVal);
      // 设置值
      setCurrentValue(Number(commitVal));
      // 执行回调
      callback?.(commitVal);
    },
    [currentValue, min, max, value],
  );
  ```
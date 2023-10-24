---
title: Radio 单选框
nav:
  path: /components
group:
  title: 数据录入
  order: 4
mobile: false
toc: content
---

<h1>Radio</h1>
单选框。

何时使用
- 用于在多个备选项中选中单个状态。
- 和 Select 的区别是，Radio 所有选项默认可见，方便用户在比较中选择，因此选项不宜过多。

```jsx
/**
 * title: 基本使用
 * description: 单选框
 */
import React from 'react';
import { Radio } from 'happy-ui';

export default () => {
  return (
    <Radio>Radio</Radio>
  )
}
```

```jsx
/**
 * title: 禁用
 * description: 禁用单个单选框
 */
import React, { useState } from 'react';
import { Radio, Space, Button } from 'happy-ui';

export default () => {
  const [disabled, setDisabled] = useState(true);

  return (
    <Space direction='vertical'>
      <Radio disabled={disabled}>Radio</Radio>
      <Button type='primary' onClick={() => setDisabled(!disabled)}>
        Toggle disabled
      </Button>
    </Space>
  )
}
```

```jsx
/**
 * title: 单选组合
 * description: 配合 RadioGroup 实现一组互斥的 Radio 配合使用
 */
import React, { useState } from 'react';
import { Radio } from 'happy-ui';

export default () => {
  const [value, setValue] = useState(1);
  const onChange = (value) => {
    console.log('radio checked', value);
    setValue(value);
  }

  return (
    <Radio.Group onChange={onChange} value={value}> 
      <Radio value={1}>Radio1</Radio>
      <Radio value={2}>Radio2</Radio>
      <Radio value={3}>Radio3</Radio>
      <Radio value={4}>Radio4</Radio>
    </Radio.Group>
  )
}
```

```jsx
/**
 * title: 垂直的单选组合
 * description: 配合 RadioGroup 和 Space 实现垂直的单选组合
 */
import React, { useState } from 'react';
import { Radio, Space } from 'happy-ui';

export default () => {
  const [value, setValue] = useState(1);
  const onChange = (value) => {
    console.log('radio checked', value);
    setValue(value);
  }

  return (
    <Radio.Group onChange={onChange} value={value}> 
      <Space direction='vertical'>
        <Radio value={1}>Radio1</Radio>
        <Radio value={2}>Radio2</Radio>
        <Radio value={3}>Radio3</Radio>
        <Radio value={4}>Radio4</Radio>
      </Space>
    </Radio.Group>
  )
}
```

```jsx
/**
 * title: 禁用所有子选项
 * description: 设置 `RadioGroup.disabled`，可以禁选中所有子选项
 */
import React, { useState } from 'react';
import { Radio, Space } from 'happy-ui';

export default () => {
  const [value1, setValue1] = useState(1);
  const [value2, setValue2] = useState(1);

  const onChange1 = (value) => {
    console.log('radio1 checked', value);
    setValue1(value);
  }

  const onChange2 = (value) => {
    console.log('radio2 checked', value);
    setValue2(value);
  }

  return (
    <Space direction='vertical'>
      <Radio.Group onChange={onChange1} value={value1}> 
        <Radio value={1}>Radio1</Radio>
        <Radio value={2}>Radio2</Radio>
        <Radio value={3} disabled>Radio3</Radio>
        <Radio value={4}>Radio4</Radio>
      </Radio.Group>
      <Radio.Group disabled onChange={onChange2}  value={value2}> 
        <Radio value={1} disabled>Radio1</Radio>
        <Radio value={2}>Radio2</Radio>
        <Radio value={3}>Radio3</Radio>
        <Radio value={4}>Radio4</Radio>
      </Radio.Group>
    </Space>
  )
}
```

```jsx
/**
 * title: 单选组合-配置方式
 * description: 通过配置 `options` 参数来渲染单选框，也可以通过 `optionType` 控制 Radio 类型。
 */
import React, { useState } from 'react';
import { Space, Radio } from 'happy-ui';

const options1 = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange' },
];

const options2 = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange', disabled: true },
  { label: 'Banana', value: 'Banana' },
  { label: 'Lemon', value: 'Lemon' },
];

const options3 = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange' },
  { label: 'Banana', value: 'Banana' },
  { label: 'Lemon', value: 'Lemon' },
];

const options4 = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange', disabled: true },
  { label: 'Banana', value: 'Banana' },
  { label: 'Lemon', value: 'Lemon' },
];

export default () => {
  const [value1, setValue1] = useState('Apple');
  const [value2, setValue2] = useState('Lemon');
  const [value3, setValue3] = useState('Apple');
  const [value4, setValue4] = useState('Lemon');

  const onChange1 = (value) => {
    console.log('radio1 checked', value);
    setValue1(value);
  };

  const onChange2 = (value) => {
    console.log('radio2 checked', value);
    setValue2(value);
  };

  const onChange3 = (value) => {
    console.log('radio3 checked', value);
    setValue3(value);
  };

  const onChange4 = (value) => {
    console.log('radio4 checked', value);
    setValue4(value);
  };

  return (
    <Space direction='vertical' size={16}>
      <Radio.Group 
        options={options1} 
        onChange={onChange1} 
        value={value1} 
      /> 
      <Radio.Group 
        options={options2} 
        onChange={onChange2} 
        value={value2} 
      /> 
      <Radio.Group 
        options={options3} 
        onChange={onChange3} 
        value={value3}
        optionType='button' 
      /> 
      <Radio.Group 
        options={options4} 
        onChange={onChange4} 
        value={value4}
        buttonStyle='solid'
        optionType='button' 
      /> 
    </Space>
  )
}
```

```jsx
/**
 * title: 单选组合按钮
 * description: 通过配置直接使用 `Radio.Button` 实现一组单选按钮。<br/> `注意：单选按钮目前只支持受控组件的形式使用`
 */
import React, { useState } from 'react';
import { Radio, Space } from 'happy-ui';

export default () => {
  const [value1, setValue1] = useState("a");
  const [value2, setValue2] = useState("a");
  const [value3, setValue3] = useState("a");

  const onChange1 = (value) => {
    console.log('radio1 checked: ', value);
    setValue1(value);
  };

  const onChange2 = (value) => {
    console.log('radio2 checked: ', value);
    setValue2(value);
  };

  const onChange3 = (value) => {
    console.log('radio3 checked: ', value);
    setValue3(value);
  };

  return (
    <Space direction='vertical'>
      <Radio.Group onChange={onChange1} value={value1}>
        <Radio.Button value="a">Hangzhou</Radio.Button>
        <Radio.Button value="b">Shanghai</Radio.Button>
        <Radio.Button value="c">Beijing</Radio.Button>
        <Radio.Button value="d">Chengdu</Radio.Button>
      </Radio.Group>
      <Radio.Group onChange={onChange2} value={value2} style={{ marginTop: 16 }}>
        <Radio.Button value="a">Hangzhou</Radio.Button>
        <Radio.Button value="b" disabled>
          Shanghai
        </Radio.Button>
        <Radio.Button value="c">Beijing</Radio.Button>
        <Radio.Button value="d">Chengdu</Radio.Button>
      </Radio.Group>
      <Radio.Group disabled onChange={onChange3} value={value3} style={{ marginTop: 16 }}>
        <Radio.Button value="a">Hangzhou</Radio.Button>
        <Radio.Button value="b">Shanghai</Radio.Button>
        <Radio.Button value="c">Beijing</Radio.Button>
        <Radio.Button value="d">Chengdu</Radio.Button>
      </Radio.Group>
    </Space>
  )
};
```

```jsx
/**
 * title: 单选组合-配合 name 使用
 * description: 可以为 Radio.Group 配置 `name` 参数，为组合内的 input 元素赋予相同的 name 属性，使浏览器把 Radio.Group 下的 Radio 真正看作是一组（例如可以通过方向键始终在同一组内更改选项）。
 */
import React, { useState } from 'react';
import { Radio } from 'happy-ui';

export default () => {
  const [value, setValue] = useState(1);
  const onChange = (value) => {
    console.log("radio changed", value);
    setValue(value);
  }
  
  return  (
    <Radio.Group name="radiogroup" onChange={onChange} value={value}>
      <Radio value={1}>A</Radio>
      <Radio value={2}>B</Radio>
      <Radio value={3}>C</Radio>
      <Radio value={4}>D</Radio>
    </Radio.Group>
  );
}
```

```jsx
/**
 * title: 大小
 * description: 大中小三种组合
 */
import React, { useState } from 'react';
import { Space, Radio } from 'happy-ui';

const options1 = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange' },
];

const options2 = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange' },
];

const options3 = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange' },
];

export default () => {
  const [value1, setValue1] = useState('Apple');
  const [value2, setValue2] = useState('Apple');
  const [value3, setValue3] = useState('Apple');

  const onChange1 = (value) => {
    console.log('radio1 checked', value);
    setValue1(value);
  };

  const onChange2 = (value) => {
    console.log('radio2 checked', value);
    setValue2(value);
  };

  const onChange3 = (value) => {
    console.log('radio3 checked', value);
    setValue3(value);
  };

  return (
    <Space direction='vertical' size={16}>
      <Radio.Group 
        options={options1} 
        onChange={onChange1} 
        value={value1} 
        optionType='button'
        size='large'
      /> 
      <Radio.Group 
        options={options2} 
        onChange={onChange2} 
        value={value2} 
        optionType='button'
      /> 
      <Radio.Group 
        options={options3} 
        onChange={onChange3} 
        value={value3}
        optionType='button' 
        size='small'
      /> 
    </Space>
  )
}
```


## API
### Radio
| 属性 | 类型               | 默认值   | 必填 | 说明 |
| ---- | ------------------| -------- | ---- | ---- |
| disabled | boolean | false |  false  | 是否禁用 
| value | any | - |  false  | 根据 value 进行比较，判断是否选中
| checked | boolean | - |  false  | 指定当前是否选中	
| defaultChecked | boolean | - |  false  | 初始是否选中


### Radio.Group
| 属性 | 类型               | 默认值   | 必填 | 说明 |
| ---- | ------------------| -------- | ---- | ---- |
| className | string | - |  false  | 自定义类名
| style | CSSProperties | - |  false  | 自定义 style 样式
| value | any | - |  false  | 根据 value 进行比较，判断是否选中
| name | string | - |  false  | RadioGroup 下所有 input[type="radio"] 的 name 属性
| options | string[]、number[]、Array<{ label: React.ReactNode; value: string; disabled?: boolean }> | - |  false  | 以配置形式设置子元素
| size | 'large'、'middle'、'small' | 'middle' |  false  | 大小，只对按钮样式生效
| buttonStyle | 'outline'、'solid' | 'outline' |  false  | Button 单选框的风格样式，目前有描边和填色两种风格
| disabled | boolean | false |  false  | 是否禁止选中所有子选项
| optionType | 'default'、'button' | 'defalt' |  false  | Radio的类型
| onChange | function(e:Event) | - |  false  | 选项变化时的回调函数

## 思路
Radio 组件的思路也比较简单，复杂的在于和 Radio.Group 一起使用的时候

- 1、在 Radio.Group 组件中（即`父组件`），我们将接受到的 `value`、`onChange` 回调，放入 `groupContext` 这个 context 中，在我的代码中，我将他们改了下名字，然后通过 context 将 `父组件 RadioGroup` 的这两个状态传入 `子组件 Radio` 中

```js
//RadioGroup.tsx
export interface IGroupContext {
  groupValue?: any;
  onGroupChange?: ((value: any) => void) | undefined;
}


export const GroupContext = createContext<IGroupContext>({
  groupValue: undefined,
  onGroupChange: () => {},
});

const RadioGroup: React.FC<IRadioGroupProps> = ({

}) => {
  //... 其余代码
  const groupContext = useMemo(() => {
    return {
      groupValue: value,
      onGroupChange: onChange,
    };
  }, [value, onChange]);

  //...其余代码
  <GroupContext.Provider value={groupContext}>
    {props.children}
  </GroupContext.Provider>
}
```

- 2、然后在 `Radio` 组件里面，我们通过 `useContext` 获取到 `groupValue`、`onGroupChange`。然后我们就可以通过判断是否传入了 `groupValue` 来区分 `RadioGroup` 和 `Radio` 是否一起使用

- 3、如果一起使用，`初始化选中状态时`，可以通过 `groupValue === value` 来判断当前这个 `Radio` 是否选中；如果没有一起使用，则通过 `checked` 或 `defaultChecked` 来判断是否选中（或默认选中）

- 4、然后，在切换选择单选按钮时，如果是一起使用，则直接调用 `onGroupChange?.(value ?? groupValue)` 将当前选择的值回传给`父组件RadioGroup`，然后父组件状态改变，子组件刷新，子组件刷新的时候又`执行第三步`的操作去判断当前选中的是哪一个单选框；如果不是一起使用，则直接改变 `Radio` 组件内部的选中状态即可


然后还有一种情况就是通过配置 `RadioGroup 的 options` 去配置生成单选组的时候：

- 同样通过 `GroupContext.Provider` 去传递数据给子组件 Radio，然后去遍历 `options`，每一项用 `Radio` 去包裹即可

- 然后内部的选中逻辑和前面的一样，不再赘述


总结起来一句话就是：如果配合 Radio.Group 使用时，由 Radio.Group 去控制 Radio 的状态。
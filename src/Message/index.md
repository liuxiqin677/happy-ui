---
title: Message 消息提示
nav:
  path: /components
group:
  title: 反馈
  order: 3
mobile: false
toc: content
---

<h1>Message</h1>
全局展示操作反馈信息。

何时使用
- 可提供成功、警告和错误等反馈信息。
- 顶部居中显示并自动消失，是一种不打断用户操作的轻量级提示方式。

```jsx
/**
 * title: API调用
 * description: 通过 `Message.api` 来创建 Message
 */
import React, { useState } from 'react';
import { Message, Button, Space } from 'happy-ui';

export default () => { 
  return (
    <Space>
      <Button 
        type='primary' 
        onClick={() => {
          Message.info({
            content: 'hello Happy-ui',
          })
        }}
      >
        Info Message
      </Button>
    </Space>
  )
}
```

```jsx
/**
 * title: 其他提示类型
 * description: 包括成功、失败、警告。
 */
import React, { useState } from 'react';
import { Message, Button, Space } from 'happy-ui';

export default () => { 
  return (
    <Space>
      <Button 
        onClick={() => {
          Message.info({
            content: 'hello Happy-ui',
          })
        }}
      >
        Info Message
      </Button>
      <Button 
        onClick={() => {
          Message.error({
            content: 'hello Happy-ui',
          })
        }}
      >
        Error Message
      </Button>
      <Button 
        onClick={() => {
          Message.success({
            content: 'hello Happy-ui',
          })
        }}
      >
        Success Message
      </Button>
      <Button 
        onClick={() => {
          Message.warn({
            content: 'hello Happy-ui',
          })
        }}
      >
        Warning Message
      </Button>
    </Space>
  )
}
```

```jsx
/**
 * title: 修改延时
 * description: 自定义时长 `10s`，默认时长为 `3s`。当 `duration = 0` 时，不会自动消失
 */
import React, { useState } from 'react';
import { Message, Button, Space } from 'happy-ui';

export default () => { 
  return (
    <Space>
      <Button 
        type='primary' 
        onClick={() => {
          Message.success({
            content: 'hello Happy-ui',
            duration: 10
          })
        }}
      >
        10s delay Message
      </Button>
      <Button 
        onClick={() => {
          Message.success({
            content: 'hello Happy-ui',
            duration: 0
          })
        }}
      >
        never hide Message
      </Button>
    </Space>
  )
}
```

```jsx
/**
 * title: 更新消息内容
 * description: 可以通过唯一的 `key` 来更新内容。
 */
import React, { useState } from 'react';
import { Message, Button, Space } from 'happy-ui';

export default () => { 
  return (
    <Space>
      <Button 
        type='primary' 
        onClick={() => {
          Message.success({
            content: 'hello Happy-ui',
            key: 'update_success',
          })
          setTimeout(() => {
            Message.update({
              content: 'hello Jolyne!',
              key: 'update_success',
            })
          }, 1000)
        }}
      >
        update Message
      </Button>
    </Space>
  )
}
```

## API
| 属性 | 类型               | 默认值   | 必填 | 说明 |
| ---- | ------------------| -------- | ---- | ---- |
| className | string | - |  false  | 自定义 CSS class
| content | ReactNode | - |  false  | 提示内容	
| duration | number | 3 |  false  | 自动关闭的延时，单位秒。设为 0 时不自动关闭
| icon | ReactNode	 | - |  false  | 自定义图标	
| key | string、number	 | - |  false  | 当前提示的唯一标志		
| style | CSSProperties	 | - |  false  | 自定义内联样式				

## 思路
Message 组件的难点主要是如何通过 `API` 调用的方式去渲染 Message

首先，Message 组件通过 `API` 的方式去生成的方式，需要暴露一个对象出来，即：
```js
  const Message = {
    info: (config) => addMessage(config),
    success: (config) => addMessage(config),
    // .... 后续方法
  }
```
对象中的每一个方法都是通过我们定义的函数 `addMessage ` 添加一个 Message DOM。然后，我们现在需要思考的是，如何手动的将 Message 添加到 DOM 结构中去。

说到在 React 中手动生成 DOM 节点，首先想到的就是 `ReactDOM.render()` 这个 API，但是 React 18 不再支持这个 API 了，在未来版本中将会被废弃，请使用 `createRoot` 来替代。

然后，如果需要渲染多条 Message 怎么办呢？

我们可以通过定义一个`队列`，通过 React 的核心思想：`UI = component(state)` 去渲染多个 Message。即：`核心思想就是通过数据的增删来实现响应式的更新 UI`。

然后还需要注意的是，`多个 Message 应该在一个 container 里面`，所以在渲染前需要判断有没有这个 `container`，没有就先创建

```js
  import { createRoot } from 'react-dom/client';

  const CONTAINER_ID = 'happy-message-container';
  const MESSAGE_QUEUE = [];
  let containerRoot;

  // 添加 messge
  const addMessage = (config) => {
    // 添加到队列中
    MESSAGE_QUEUE.push({...config})
    // 然后渲染
    renderMessage([...MESSAGE_QUEUE])
  }

  // 渲染 message
  const renderMessage = (queue) => {
    const container = createContainer();
    if (!containerRoot) {
      containerRoot = createRoot(container);
    }

    const MessageComponents = messageQueue.map((props) => {
      return <BaseMessage {...props} key={props.id} />;
    });

    // 渲染
    containerRoot.render(MessageComponents);
  }

  //创建 container 
  const createContainer = () => {
    let container = document.getElementById(CONTAINER_ID);
    if (!container) {
      container = document.createElement('div');
      container.setAttribute('id', CONTAINER_ID);
      document.body.appendChild(container);
    }
    return container;
  }
```

这样，添加、渲染就完成了。

然后对于像 `更新 Message、删除 Message`，同样的，去更新、删除 `MESSAGE_QUEUE 中的数据`即可

其中，`更新 Message` 的话就是去 `MESSAGE_QUEUE` 中查找 `item.key === config.key` 的项，然后把最新的 `{...prevConfig, ...config}` 作为新的 数据存入 MESSAGE_QUEUE 即可
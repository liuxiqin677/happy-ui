---
title: Modal 模态框
nav:
  path: /components
group:
  title: 反馈
  order: 3
mobile: false
toc: content
---

# Modal
模态对话框。

何时使用
- 需要用户处理事务，又不希望跳转页面以致打断工作流程时，可以使用 Modal 在当前页面正中打开一个浮层，承载相应的操作。

## 基本使用

第一个对话框

<code src='./demos/demo1.tsx'></code>


## 异步关闭

点击确定后异步关闭对话框，例如提交表单。

<code src='./demos/demo2.tsx'></code>

## 自定义页脚

更复杂的例子，自定义了页脚的按钮，点击提交后进入 loading 状态，完成后关闭。不需要默认确定取消按钮时，你可以把 `footer 设为 null`。

<code src='./demos/demo3.tsx'></code>

## 按钮文字

设置 `okText` 与 `cancelText` 以自定义按钮文字

<code src='./demos/demo4.tsx'></code>

## 自定义位置

使用 `centered` 或类似 `style.top` 的样式来设置对话框位置。

<code src='./demos/demo5.tsx'></code>

## 自定义页脚按钮属性

传入 `okButtonProps` 和 `cancelButtonProps` 可分别自定义确定按钮和取消按钮的 props。

<code src='./demos/demo6.tsx'></code>

## 自定义模态框的宽度

使用 `width` 来设置模态对话框的宽度

<code src='./demos/demo7.tsx'></code>

## 模态框类型

使用 `type` 来设置模态对话框的类型，必须配合 `title` 一起使用

<code src='./demos/demo8.tsx'></code>

## 自定义内部模块 styles

通过 `styles` 属性设置弹窗内部区域（`header、body、footer、mask、wrapper`）的 style

<code src='./demos/demo9.tsx'></code>

## 嵌套 Modal

嵌套 Modal

<code src='./demos/demo10.tsx'></code>

## API
| 属性 | 类型               | 默认值   | 必填 | 说明 |
| ---- | ------------------| -------- | ---- | ---- |
| afterClose | function | - |  false  | Modal 完全关闭后的回调 
| className | string | - |  false  | 弹窗className
| style | CSSProperties | - | false | 弹窗 style
| type | 'confirm'、'warning'、'info' 、'error'、 'success' | 'confirm' |  false  | 弹窗类型
| styles | header?: CSSProperties; body?: CSSProperties; footer?: CSSProperties; mask?: CSSProperties; wrapper?: CSSProperties; | - |  false  | 配置弹窗内置模块的 style	
| cancelButtonProps | IButtonProps | - | false | cancel 按钮 props
| cancelText | ReactNode | - | false | cancel 按钮 文字
| centered | boolean | false | false | 弹窗居中
| closeIcon | boolean、ReactNode | true | false | 右上角弹窗关闭icon
| confirmLoading | boolean | false | false | ok按钮的loading
| footer | ReactNode[] | - | false | 自定义页脚按钮
| mask | boolean | true | false | 是否展示遮罩层
| maskClosable | boolean | true | false | 是否点击遮罩层关闭弹窗
| destroyOnClose | boolean | false | false | 关闭时销毁 Modal 里的子元素
| okButtonProps | IButtonProps | - | false | ok 按钮 props
| okText | ReactNode | - | false | ok 按钮的文字
| okType | ButtonType | - | false | ok 按钮的类型
| title | ReactNode | - | false | 弹窗标题
| open | boolean | - | false | 显示弹窗
| width | number | - | false | 弹窗宽度
| onCancel | function | - | false | cancel 按钮的回调
| onOk | function | - | false | ok 按钮的回调

## 思路
Modal组件的实现也不算难，这里主要说我认为需要说明的几个点

### Modal 的渲染
1. 因为模态框有遮罩层，然后内容部分需要相对于弹窗自己来定位，所以需要通过 `createPortal` 把模态框挂到 `document.body` 下

2. 遮罩层和模态框的内容分别用两个 div 来实现，然后需要注意他们的`层级`。遮罩层的层级我设置的是`z-index: 1000`，模态框部分的是`z-index:1001`，这样当点击模态框内容的时候（不点按钮），才不会关掉模态框。然后点击遮罩层的时候能关掉模态框。保证功能正常

3. 模态框显示隐藏的动画部分，我们是通过 `display: none` 来实现的，而该属性并`不能执行动画效果`，所以通过 `animation + @keyframes` 来实现动画效果


### 关闭时销毁弹窗子元素
 `destroyOnClose` 设置为 `true` 时，关闭弹窗时需要销毁 `content` 里面的内容，重新显示时，重新渲染内容。这一部分的逻辑是：内部记录一个 `destroyChild` 的 state，当点击取消按钮、确认按钮、遮罩层时，设置为 true，然后 content 的渲染逻辑是 `!destoryChild && (<div>content</div>)` ，此时相当于 `!destoryChild 为 false`，于是相当于清除了 content 的部分

`destroyOnClose` 部分代码如下：
```ts
  // 关闭弹窗时的回调
  const handleModal = (cb?: () => any) => {
    //....
    cb?.();
    if (destroyOnClose) {
      setDestroyChild(true);
    }
    //....
  };

  const handleOk = () => {
    handleModal(onOk)
  }

  const handleCanlce = () => {
    handleModal(onCancel)
  }
```
### afterClose
 `afterClose` 在弹窗关闭后的回调，这部分的逻辑是：通过`闭包`，在 Modal 组件外部定义一个 `let hiddenCount = 0` 变量，在 `useEffect` 中，当 `!open && hiddenCount` 时（也就是关闭模态框，且 hiddenCount 不为 0 时），此时再去调用 `afterClose`

```js
  let hiddenCount = 0;
  
  useEffect(() => {
    // ....

    if (!open && hiddenCount) {
      hiddenCount = 0;
      afterClose?.();
    }
    hiddenCount = 1;

    //....
  }, [open]);
```

需要注意的是：我们要在执行 afterClose 前重置 hiddenCount，避免其他使用 Modal 组件的函数的影响。

### modal 弹出时，页面不能有滚动条
这个思路是：`open` 为 true 时，设置 `document.body.overflow = 'hidden'`
```js
  useEffect(() => {
    if (open) {
      document.body.overflow = 'hidden';
    }
  }, [open])
```

当然，如果有多个层级的 modal，比如嵌套的 modal，那么需要判断，当最后一个 modal 关闭时，才设置 `document.body.overflow = 'auto'`
```ts
  // 关闭弹窗时的回调
  const handleModal = (cb?: () => any) => {
    //....
    cb?.();
    if (destroyOnClose) {
      setDestroyChild(true);
    }
    //....
    // 每当一个 modal 打开时，会新增 happy-modal-root-visible 的类名
    // 多层 modal 时，当只有最后一个弹窗时，才设置 overflow
    if (document.querySelectorAll('.happy-modal-root-visible').length === 1) {
      document.body.style.overflow = 'auto';
    }
  };
```

## 遗留问题
当多个 Modal 层叠弹出时，按住 ESC 键会全部关掉。而 [antd](https://ant-design.antgroup.com/components/modal-cn?locale=zh-CN#modal-demo-confirm-router) 是会一层一层关掉。
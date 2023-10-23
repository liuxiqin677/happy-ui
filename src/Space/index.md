---
title: Space 间距
nav:
  path: /components
group:
  title: 布局
  order: 2
mobile: false
toc: content
---

# Space

设置组件之间的间距。

## 基本用法

相邻组件水平间距

<code src="./demos/demo1.tsx"></code>

## 垂直布局

相邻组件垂直间距

<code src="./demos/demo2.tsx"></code>

## 间距大小

使用 size 设置元素之间的间距，预设了 small、middle、large 三种尺寸. 若不设置 size，则默认为 small。

<code src="./demos/demo3.tsx"></code>

## 对齐方式

设置对齐模式

<code src="./demos/demo4.tsx"></code>

## 分隔符

设置 `split`属性自定义分隔符

<code src="./demos/demo5.tsx"></code>



## API  
| 属性 | 类型               | 默认值   | 必填 | 说明 |
| ---- | ------------------| -------- | ---- | ---- |
| align | 'start'、'end'、'center'、'baseline' | 'start' |  false  | 对齐方式	 
| direction | 'vertical'、'horizontal' | 'horizontal' |  false  | 间距方向	
| size | Size、Size[] | 'small' |  false  | 间距大小	
| split | ReactNode | - |  false  | 设置拆分	
| wrap | 'small'、'default'、'large' | 'default' |  false  | 是否自动换行，仅在 horizontal 时有效	



## 思路
- 首先, 要布局, 则需要给每一个子元素`包括一层 div`, 所以我们需要去遍历 **props.children**, 用 `Item` 子组件包裹起来. 然而 **props.children** 可能是嵌套的多数组, 所以我们通过 **React.Children.toArray(props.chldren)** 转为扁平化的数组. 但是我们希望像 `<></>` 不过滤掉, 所以这里我们自己实现了一个 `toArray` 方法. 当然你也可以直接用 **React.Children.toArray(props.chldren)** 去遍历子元素

- 遍历完子元素后, 都被包裹了一层 div, 那么我们需要写样式. 

  1. 首先我们通过 `useFlexGapSupport` 这个 hook, 来判断是否支持 `gap` 属性, 能用 `gap` 属性做间隔是最好的. 如果不支持再用 `margin`.  `useFlexGapSupport` 的逻辑是: 创建一个 div(我们叫他 `flexDiv` 吧), 然后设置这个 div 的样式为 `display: 'flex', flexDirection: 'column', rowGap: '1px'`然后再创建两个 div, 通过 `appendChild` 添加到 flexDiv 中, 然后再把 flexDiv 加到 body 下, 判断 `flexDiv.scrollHeight 是否等于 1`, 等于就支持否则就不支持 gap.  然后再删除 flexDiv.
  
  2. 在支持了 gap 后, 我们通过 `classnames` 这个包, 来生成对应的 className 用来布局. 然后再写上对应的样式
  

- 完成上面的功能后, 还需要处理 `ConfigProvider` 的功能
  比如:

  ```js
  const App = () => {
    <ConfigProvider space={{size: 100}}>
      <Space>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Space>
    </ConfigProvider>
  }
  ```
  渲染如下:
  ![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/31e840df1ebf47b5b6a70a2f5f3a77cb~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=394&h=198&s=14720&e=png&b=ffffff)

  他能够通过 `context` 的方式传递 `size` 给子代元素完成布局. 所以我们来处理这个东西

  1. 首先我们通过 **createContext** 创建一个 `ConfigContext`, 然后通过**useContext**读取, 作为 props 的默认结构值. 这样如果传入了 props.size 就用传入的值，否则就用 context 里的值。

  2. 然后, 再创建一个 `SpaceContext` 传给 Item 子组件.  因为 Item 子组件不知道层级在哪里. 把 `size` `是否支持gap` `direction` `className`等等通过**Provider** 供给子组件使用
  ```js
  <SpaceContext.Provider value={spaceContext}>
    {nodes}
  </SpaceContext.Provider>
  ```

  3. Item 子组件通过**useContext**拿到 context 中的内容后, 根据是否支持 gap, 来设置间距
  再设置每个子元素的样式 className, 然后再去做 `split` 自定义分隔符的功能即可


- 至此, Space 组件完成


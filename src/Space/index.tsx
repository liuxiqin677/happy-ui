/**
  封装了 useFlexGapSupport 的 hook，里面通过创建 div 检查 scrollHeight 的方式来确定是否支持 gap 样式(antd是这样做的)
  通过 useContext 读取 ConfigContext 的值，作为 props 的解构默认值
  通过 createContext 创建 spaceContext，并通过 Provider 设置其中的值, 并传递给子组件 Item(不确定 Item 在哪个层级)
  通过 useMemo 缓存作为参数的对象，避免不必要的渲染
 通过 classnames 包来根据 props 动态生成 className
  通过 align 生成对应的 className 来设置内容的对齐方式, center flex-start flex-end baseline
 */
import classNames from 'classnames';
import * as React from 'react';
import Item from './Item';
import { ConfigContext, SizeType } from './config-provider';
import './index.less';
import useFlexGapSupport from './useFlexGapSupport';

export interface Option {
  keepEmpty?: boolean;
}

export const SpaceContext = React.createContext({
  latestIndex: 0,
  horizontalSize: 0,
  verticalSize: 0,
  supportFlexGap: false,
});

export type SpaceSize = SizeType | number;

export interface SpaceProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  style?: React.CSSProperties;
  size?: SpaceSize | [SpaceSize, SpaceSize];
  direction?: 'horizontal' | 'vertical';
  align?: 'start' | 'end' | 'center' | 'baseline';
  split?: React.ReactNode;
  wrap?: boolean;
}

const spaceSize = {
  small: 8,
  middle: 16,
  large: 24,
};

function getNumberSize(size: SpaceSize) {
  return typeof size === 'string' ? spaceSize[size] : size || 0;
}

const Space: React.FC<SpaceProps> = (props) => {
  const {
    getPrefixCls, //生成样式前缀 即: happy-xxx
    space, //间距
    direction: directionConfig, //方向
  } = React.useContext(ConfigContext);

  const {
    size = space?.size || 'small',
    align,
    className,
    children,
    direction = 'horizontal',
    split,
    style,
    wrap = false,
    ...otherProps
  } = props;

  // 判断是否支持 gap 属性
  const supportFlexGap = useFlexGapSupport();

  // size 可以是 SizeType 类型, 也可以是传入具体的数字
  // 这里处理成 [size, size] 用于计算水平以及垂直的间距 gap
  const [horizontalSize, verticalSize] = React.useMemo(
    () =>
      (
        (Array.isArray(size) ? size : [size, size]) as [SpaceSize, SpaceSize]
      ).map((item) => getNumberSize(item)),
    [size],
  );

  // 对 children 扁平化 这样调用 数组方法不会报错
  const childNodes = React.Children.toArray(children);

  // 判断下对齐方式
  const mergedAlign =
    align === undefined && direction === 'horizontal' ? 'center' : align;

  // 生成 class 前缀, 即 happy-space
  const prefixCls = getPrefixCls('space');
  // classNames 第三方包生成 Space 组件的 className 类名
  const cn = classNames(
    prefixCls,
    `${prefixCls}-${direction}`,
    {
      [`${prefixCls}-rtl`]: directionConfig === 'rtl',
      [`${prefixCls}-align-${mergedAlign}`]: mergedAlign,
    },
    className,
  );
  // 这个是 Item 子组件的类名前缀 happy-space-item
  const itemClassName = `${prefixCls}-item`;

  // 如果不支持 gap 属性, Item 子组件通过设置 marin 来控制间距
  const marginDirection =
    directionConfig === 'rtl' ? 'marginLeft' : 'marginRight';

  // 用 Item 组件包裹每一个 children
  // 并记录有多少个 children . 通过记录下标的方式来
  let latestIndex = 0;
  const nodes = childNodes.map((child: any, i) => {
    if (child !== null && child !== undefined) {
      latestIndex = i;
    }

    const key = (child && child.key) || `${itemClassName}-${i}`;

    return (
      <Item
        className={itemClassName}
        key={key}
        direction={direction}
        index={i}
        marginDirection={marginDirection}
        split={split}
        wrap={wrap}
      >
        {child}
      </Item>
    );
  });

  const spaceContext = React.useMemo(
    () => ({ horizontalSize, verticalSize, latestIndex, supportFlexGap }),
    [horizontalSize, verticalSize, latestIndex, supportFlexGap],
  );

  // =========================== Render ===========================
  if (childNodes.length === 0) {
    return null;
  }

  const gapStyle: React.CSSProperties = {};

  // 如果设置自动换行
  if (wrap) {
    gapStyle.flexWrap = 'wrap';

    // 如果不支持 gap, 就用 margin 来设置间距样式
    if (!supportFlexGap) {
      gapStyle.marginBottom = -verticalSize;
    }
  }

  // 如果支持 gap, 设置水平 垂直的 gap 值
  if (supportFlexGap) {
    gapStyle.columnGap = horizontalSize;
    gapStyle.rowGap = verticalSize;
  }

  return (
    <div
      className={cn}
      style={{
        ...gapStyle,
        ...style,
      }}
      {...otherProps}
    >
      {/* 这里给 Item 子组件传递数据也是通过 context，因为 Item 组件不一定会在哪一层。 */}
      <SpaceContext.Provider value={spaceContext}>
        {nodes}
      </SpaceContext.Provider>
    </div>
  );
};

export default Space;

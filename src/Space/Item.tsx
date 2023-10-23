/*
 * @Author: liuxiqin
 * @Date: 2023-10-08 15:37:27
 * @LastEditTime: 2023-10-08 16:20:56
 * @LastEditors: liuxiqin
 * @Description:
 */
import * as React from 'react';
import { SpaceContext } from '.';

export interface ItemProps {
  className: string;
  children: React.ReactNode;
  index: number;
  direction?: 'horizontal' | 'vertical';
  marginDirection: 'marginLeft' | 'marginRight';
  split?: string | React.ReactNode;
  wrap?: boolean;
}

const Item: React.FC<ItemProps> = ({
  className,
  direction,
  index,
  marginDirection,
  children,
  split,
  wrap,
}) => {
  const { horizontalSize, verticalSize, latestIndex, supportFlexGap } =
    React.useContext(SpaceContext);

  let style: React.CSSProperties = {};

  // 不支持 gap 时才去手动设置 style 变量
  if (!supportFlexGap) {
    if (direction === 'vertical') {
      // 如果不支持 gap 并且是垂直布局,且还不是最后一个,那就设置 marginBottom
      if (index < latestIndex) {
        style = { marginBottom: horizontalSize / (split ? 2 : 1) };
      }
    } else {
      // 如果不支持 gap 并且是横向布局, 且还不是最后一个, 那就设置 marginLeft | marginRight
      style = {
        ...(index < latestIndex && {
          [marginDirection]: horizontalSize / (split ? 2 : 1),
        }),
        // 如果自动换行就设置 paddingBottom, 且 wrap 仅在 水平布局时生效
        ...(wrap && { paddingBottom: verticalSize }),
      };
    }
  }

  if (children === null || children === undefined) {
    return null;
  }

  return (
    <>
      <div className={className} style={style}>
        {children}
      </div>
      {/* 如果传入了自定义的分隔符 split, 就加载每一项的后面即可 */}
      {index < latestIndex && split && (
        <span className={`${className}-split`} style={style}>
          {split}
        </span>
      )}
    </>
  );
};

export default Item;

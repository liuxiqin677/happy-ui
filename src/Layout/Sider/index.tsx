/*
 * @Author: liuxiqin
 * @Date: 2023-10-19 11:08:57
 * @LastEditTime: 2023-10-19 11:14:24
 * @LastEditors: liuxiqin
 * @Description:
 */
import React, { CSSProperties, FC, memo, useMemo } from 'react';
import './index.less';

interface SliderProps {
  row?: number;
  extraStyle?: CSSProperties;
  children?: Element | undefined | string | any;
}
const Sider: FC<SliderProps> = (props) => {
  const { row, extraStyle } = props;

  const sliderRow = useMemo(() => {
    if (row) {
      return {
        width: `${row}0%`,
      };
    }
    return {};
  }, [row]);

  const propsStyle = useMemo(() => {
    if (extraStyle) {
      return extraStyle;
    }
    return {};
  }, [extraStyle]);

  return (
    <div className="happy-layout-sider" style={{ ...sliderRow, ...propsStyle }}>
      {props.children}
    </div>
  );
};
export default memo(Sider);

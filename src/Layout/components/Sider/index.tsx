import React, { CSSProperties, FC, memo, useMemo } from 'react';
import './index.less';

export interface SliderProps {
  row?: number;
  extraStyle?: CSSProperties;
  children?: Element | undefined | string | any;
}
const SiderComponent: FC<SliderProps> = (props) => {
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
export default memo(SiderComponent);

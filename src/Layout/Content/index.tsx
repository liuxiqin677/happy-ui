/*
 * @Author: liuxiqin
 * @Date: 2023-10-19 11:04:58
 * @LastEditTime: 2023-10-19 11:08:47
 * @LastEditors: liuxiqin
 * @Description:
 */
import React, { FC, memo, useMemo, CSSProperties } from 'react';
import './index.less';

interface ContentProps {
  row?: number;
  extraStyle?: CSSProperties;
  children?: Element | undefined | string | any;
}
const Content: FC<ContentProps> = (props) => {
  const { children, row, extraStyle } = props;

  const contentRow = useMemo(() => {
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
    <div
      className="happy-layout-content"
      style={{ ...contentRow, ...propsStyle }}
    >
      {children}
    </div>
  );
};
export default memo(Content);

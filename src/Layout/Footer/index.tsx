/*
 * @Author: liuxiqin
 * @Date: 2023-10-19 11:06:32
 * @LastEditTime: 2023-10-19 11:06:37
 * @LastEditors: liuxiqin
 * @Description:
 */
import React, { FC, memo, useMemo, CSSProperties } from 'react';
import './index.less';

interface FooterProps {
  extraStyle?: CSSProperties;
  children?: Element | undefined | string | any;
}
const Footer: FC<FooterProps> = (props) => {
  const { children, extraStyle } = props;

  const propsStyle = useMemo(() => {
    if (extraStyle) {
      return extraStyle;
    }
    return {};
  }, [extraStyle]);

  return (
    <div className="happy-layout-footer" style={propsStyle}>
      {children}
    </div>
  );
};
export default memo(Footer);

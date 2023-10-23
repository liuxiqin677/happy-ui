/*
 * @Author: liuxiqin
 * @Date: 2023-10-19 11:07:48
 * @LastEditTime: 2023-10-19 11:07:53
 * @LastEditors: liuxiqin
 * @Description:
 */
import React, { FC, memo, useMemo, CSSProperties } from 'react';
import './index.less';

interface HeaderProps {
  extraStyle?: CSSProperties;
  children?: Element | undefined | string | any;
}
const Header: FC<HeaderProps> = (props) => {
  const { children, extraStyle } = props;

  const propsStyle = useMemo(() => {
    if (extraStyle) {
      return extraStyle;
    }
    return {};
  }, [extraStyle]);

  return (
    <div className="happy-layout-header" style={propsStyle}>
      {children}
    </div>
  );
};
export default memo(Header);

/*
 * @Author: liuxiqin
 * @Date: 2023-10-19 10:40:54
 * @LastEditTime: 2023-10-19 11:36:14
 * @LastEditors: liuxiqin
 * @Description:
 */
import React, { FC, memo, useMemo, CSSProperties } from 'react';
import './index.less';

interface layoutProps {
  children?: any;
  extraStyle?: CSSProperties;
}

const Layout: FC<layoutProps> = (props) => {
  const { children, extraStyle } = props;

  const propsStyles = useMemo(() => {
    if (extraStyle) {
      return extraStyle;
    }
    return {};
  }, [extraStyle]);

  return (
    <div className="happy-layout" style={propsStyles}>
      {children}
    </div>
  );
};

export default memo(Layout);

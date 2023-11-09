import React, { FC, memo, useMemo } from 'react';
import './index.less';
import { HeaderProps } from './interface';

const HeaderComponent: FC<HeaderProps> = (props) => {
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
export default memo(HeaderComponent);

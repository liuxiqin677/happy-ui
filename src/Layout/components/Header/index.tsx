import React, { CSSProperties, FC, memo, useMemo } from 'react';
import './index.less';

export interface HeaderProps {
  extraStyle?: CSSProperties;
  children?: Element | undefined | string | any;
}
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

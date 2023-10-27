import React, { CSSProperties, FC, memo, useMemo } from 'react';
import './index.less';

export interface FooterProps {
  extraStyle?: CSSProperties;
  children?: Element | undefined | string | any;
}
const FooterComponent: FC<FooterProps> = (props) => {
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
export default memo(FooterComponent);

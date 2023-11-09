import React, { FC, memo, useMemo } from 'react';
import './index.less';
import { FooterProps } from './interface';

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

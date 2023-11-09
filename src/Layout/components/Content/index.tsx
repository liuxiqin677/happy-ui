import React, { FC, memo, useMemo } from 'react';
import './index.less';
import { ContentProps } from './interface';

const ContentComponent: FC<ContentProps> = (props) => {
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
export default memo(ContentComponent);

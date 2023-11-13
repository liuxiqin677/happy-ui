import cs from 'classnames';
import React, { FC, useContext, useMemo } from 'react';
import { ctx } from './index';
import './index.less';
import { IListItemProps } from './interface';

const ListItem: FC<IListItemProps> = ({ className, style = {}, children }) => {
  const { size } = useContext(ctx);

  const listItemStyle = useMemo(() => {
    const defaultStyles = style;
    switch (size) {
      case 'default':
        defaultStyles.padding = '13px 20px';
        break;
      case 'small':
        defaultStyles.padding = '9px 20px';
        break;
      case 'large':
        defaultStyles.padding = '17px 20px';
        break;
      default: {
        defaultStyles.padding = '13px 20px';
      }
    }
    return defaultStyles;
  }, [size]);

  const listItemClass = cs({
    'happy-list-item': true,
    className,
  });

  return (
    <div
      className={listItemClass}
      style={{
        ...listItemStyle,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default ListItem;

import cs from 'classnames';
import React, { FC, useMemo, useState } from 'react';
import CloseIcon from '../../components/CloseIcon';
import './index.less';
import { ITagProps } from './interface';

const Tag: FC<ITagProps> = ({
  className = '',
  style = {},
  closeable,
  color,
  icon,
  bordered = true,
  onClose,
  children,
}) => {
  const [visible, setVisible] = useState<boolean>(true);
  const presetColors: Array<string> = [
    'magenta',
    'red',
    'volcano',
    'orange',
    'gold',
    'lime',
    'green',
    'cyan',
    'blue',
    'geekblue',
    'purple',
    'success',
    'processing',
    'error',
    'warning',
    'default',
  ];
  const tagClass = useMemo(() => {
    return cs({
      'happy-tag': true,
      'happy-tag-no-bordered': !bordered,
      [`happy-tag-${color}`]: color && presetColors.includes(color),
      'happy-tag-has-no-color': color && !presetColors.includes(color),
      'happy-tag-hide': !visible,
      'happy-tag-closeable': closeable,
    });
  }, [color, bordered, visible]);

  const handleClick = (e: React.MouseEvent) => {
    if (closeable) {
      setVisible(false);
      onClose?.(e);
    }
  };

  return (
    <span
      className={`${tagClass} ${className}`}
      style={{
        ...(color && !presetColors.includes(color)
          ? {
              backgroundColor: color,
            }
          : {}),
        ...style,
      }}
    >
      {icon && <span className="happy-tag-icon">{icon}</span>}
      <span>{children}</span>
      {closeable && (
        <span className="happy-tag-close" onClick={(e) => handleClick(e)}>
          <CloseIcon />
        </span>
      )}
    </span>
  );
};

export default Tag;

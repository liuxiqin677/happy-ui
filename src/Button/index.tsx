import cs from 'classnames';
import React, { FC, useMemo } from 'react';
import LoadingIcon from '../../components/LoadingIcon';
import './index.less';
import { IButtonProps, NativeButtonProps } from './interface';

const Button: FC<IButtonProps & NativeButtonProps> = ({
  className = '',
  style = {},
  type = 'default',
  children = '',
  onClick,
  size = 'default',
  disabled = false,
  loading = false,
  icon = null,
  danger = false,
  ghost = false,
  block = false,
  ...props
}) => {
  const btnIcon = useMemo(() => {
    return icon ? 'happy-btn-icon' : '';
  }, [icon]);

  const btnClassNames = useMemo(() => {
    return cs({
      'happy-btn': true,
      'happy-btn-default': type === 'default',
      'happy-btn-primary': type === 'primary',
      'happy-btn-dashed': type === 'dashed',
      'happy-btn-link': type === 'link',
      'happy-btn-text': type === 'text',
      'happy-btn-size-lg': size === 'large',
      'happy-btn-size-sm': size === 'small',
      'happy-btn-loading': loading,
      'happy-btn-danger': danger,
      'happy-btn-ghost': ghost,
      'happy-btn-block': block,
    });
  }, [loading, danger, ghost, block, type, size]);

  return (
    <button
      type="button"
      style={style}
      className={`${btnClassNames} ${className}`}
      onClick={(e) => {
        onClick?.(e);
      }}
      disabled={disabled}
      {...props}
    >
      {loading ? (
        <div className="happy-btn-default-loading-icon">
          <LoadingIcon />
        </div>
      ) : icon ? (
        <div className={`${btnIcon}`}>{icon}</div>
      ) : null}
      {children}
    </button>
  );
};

export default Button;

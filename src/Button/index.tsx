/*
 * @Author: liuxiqin
 * @Date: 2023-10-07 11:09:34
 * @LastEditTime: 2023-10-21 12:14:09
 * @Description:
 */
import cs from 'classnames';
import React, { CSSProperties, FC, useMemo } from 'react';
import LoadingIcon from '../../components/LoadingIcon';
import './index.less';

export type ButtonType = 'default' | 'primary' | 'dashed' | 'link' | 'text';
export type ButtonSize = 'small' | 'default' | 'large';

export interface IButtonProps {
  className?: string;
  style?: CSSProperties;
  type?: ButtonType;
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  danger?: boolean;
  ghost?: boolean;
  block?: boolean;
}

type NativeButtonProps = Omit<React.ButtonHTMLAttributes<HTMLElement>, 'type'>; //原生button接口

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
        <LoadingIcon />
      ) : icon ? (
        <div className={`${btnIcon}`}>{icon}</div>
      ) : null}
      {children}
    </button>
  );
};

export default Button;

import { CSSProperties } from 'react';

interface IButtonProps {
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
type ButtonType = 'default' | 'primary' | 'dashed' | 'link' | 'text';
type ButtonSize = 'small' | 'default' | 'large';

export { ButtonSize, ButtonType, IButtonProps, NativeButtonProps };

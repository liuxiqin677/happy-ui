import { CSSProperties, ReactNode } from 'react';
interface IFlexProps {
  vertical?: boolean;
  wrap?: string;
  justify?: string;
  align?: string;
  flex?: string;
  gap?: 'small' | 'middle' | 'large' | string | number;
  children?: ReactNode;
  style?: CSSProperties;
  className?: string;
}

export { IFlexProps };

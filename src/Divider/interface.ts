import { CSSProperties, ReactNode } from 'react';
interface IDividerProps {
  type?: 'horizontal' | 'vertical';
  dashed?: boolean;
  orientation?: 'left' | 'right' | 'center';
  orientationMargin?: number | string;
  plain?: boolean;
  className?: string;
  children?: ReactNode;
  style?: CSSProperties;
}
export { IDividerProps };

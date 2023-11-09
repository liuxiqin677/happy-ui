import { CSSProperties, ReactNode } from 'react';
interface ILazyLoadProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: number;
}

export { ILazyLoadProps };

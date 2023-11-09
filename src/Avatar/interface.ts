import { CSSProperties, ReactNode } from 'react';

interface IAvatarProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  size?: number;
  shape?: 'circle' | 'square';
  autoFixFontSize?: boolean;
  triggerType?: 'mask' | 'button';
  triggerIcon?: ReactNode;
  triggerClick?: Function;
}

export { IAvatarProps };

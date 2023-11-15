import { CSSProperties, ReactNode } from 'react';

interface ITagProps {
  className?: string;
  style?: CSSProperties;
  closeable?: boolean;
  color?: string;
  icon?: ReactNode;
  bordered?: boolean;
  onClose?: (e: React.MouseEvent) => void;
  children?: ReactNode
}

export { ITagProps };

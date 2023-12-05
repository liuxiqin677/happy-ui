import { CSSProperties, ReactNode } from 'react';

interface IEmptyProps {
  style?: CSSProperties;

  className?: string;
  icon?: ReactNode;
  description?: ReactNode;
}

export type { IEmptyProps };

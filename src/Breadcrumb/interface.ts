import { ReactNode, CSSProperties } from 'react';

interface IBreadcrumbProps {
  className?: string;
  style?: CSSProperties;
  separator?: ReactNode;
  children?: ReactNode;
}

interface IBreadcrumbItemProps {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

export type { IBreadcrumbProps, IBreadcrumbItemProps };

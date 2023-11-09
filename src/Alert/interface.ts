import { ReactNode } from 'react';

interface IAlertProps {
  icon?: ReactNode;
  type?: TAlertType;
  message?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  closable?: boolean;
  closeIcon?: ReactNode | boolean;
  showIcon?: boolean;
  banner?: boolean;
  onClose?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

type TAlertType = 'success' | 'info' | 'warning' | 'error';

export { IAlertProps, TAlertType };

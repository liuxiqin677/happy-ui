import { CSSProperties, ReactNode } from 'react';
import { ButtonType, IButtonProps } from '../Button/interface';

type TModalType = 'confirm' | 'warning' | 'info' | 'error' | 'success';

interface IModalProps {
  afterClose?: () => any;
  className?: string;
  styles?: {
    header?: CSSProperties;
    body?: CSSProperties;
    footer?: CSSProperties;
    mask?: CSSProperties;
  };
  type?: TModalType;
  style?: CSSProperties;
  cancelButtonProps?: IButtonProps;
  cancelText?: ReactNode;
  centered?: boolean;
  closeIcon?: boolean | ReactNode;
  confirmLoading?: boolean;
  footer?: ReactNode[];
  mask?: boolean;
  maskClosable?: boolean;
  okButtonProps?: IButtonProps;
  okText?: ReactNode;
  okType?: ButtonType;
  title?: ReactNode;
  open?: boolean;
  width?: number;
  onCancel?: () => any;
  onOk?: () => any;
  destroyOnClose?: boolean;
  children?: ReactNode;
}

export { IModalProps, TModalType };

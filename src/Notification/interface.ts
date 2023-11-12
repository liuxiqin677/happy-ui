import { CSSProperties, ReactNode } from 'react';

type TPlacement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
type TNotificationType = 'info' | 'warning' | 'success' | 'error';

interface IBaseNotification extends INotificationConfigProps {
  currentRenderId: string;
}

interface INotificationConfigProps {
  style?: CSSProperties;
  className?: string;
  type?: TNotificationType;
  closeIcon?: ReactNode; // 自定义关闭图标
  description: ReactNode; // 通知框内容
  duration?: number; // 延迟关闭时间  0则不关闭
  icon?: ReactNode; //自定义左上角图标
  key: string; //当前通知的唯一key
  message: ReactNode; //通知提醒标题
  placement?: TPlacement; //弹出位置
  footer?: ReactNode; //自定义底部
  onClick?: () => any; // 点击通知时触发的回调函数
  onClose?: () => any; //当通知关闭时触发
}

interface INotificationProps {
  open: (params: INotificationConfigProps) => void;
  error: (params: INotificationConfigProps) => void;
  success: (params: INotificationConfigProps) => void;
  warn: (params: INotificationConfigProps) => void;
  destory: (key: string) => void;
}

export {
  IBaseNotification,
  INotificationConfigProps,
  INotificationProps,
  TPlacement,
};

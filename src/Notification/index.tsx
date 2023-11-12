import cs from 'classnames';
import React, { FC, useEffect, useMemo, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import CloseIcon from '../../components/CloseIcon';
import ErrorIcon from '../../components/ErrorIcon';
import InfoIcon from '../../components/InfoIcon';
import SuccessIcon from '../../components/SuccessIcon';
import WarningIcon from '../../components/WarningIcon';
import './index.less';
import {
  IBaseNotification,
  INotificationConfigProps,
  INotificationProps,
  TPlacement,
} from './interface';

// Notification基础组件
const BaseNotification: FC<IBaseNotification> = ({
  style = {},
  className,
  closeIcon = <CloseIcon />,
  type = 'info',
  duration = 4.5,
  description,
  icon,
  currentRenderId,
  message,
  placement = 'topRight',
  footer,
  onClick,
  onClose,
}) => {
  const timerRef = useRef<NodeJS.Timeout>();

  const notificationClass = useMemo(() => {
    return cs({
      'happy-notification': true,
      'happy-notification-topLeft': placement === 'topLeft',
      'happy-notification-topRight': placement === 'topRight',
      'happy-notification-bottomLeft': placement === 'bottomLeft',
      'happy-notification-bottomRight': placement === 'bottomRight',
      className,
    });
  }, [placement]);

  const infoIcon = useMemo(() => {
    if (icon) return icon;

    return type === 'info' ? (
      <InfoIcon />
    ) : type === 'error' ? (
      <ErrorIcon />
    ) : type === 'warning' ? (
      <WarningIcon />
    ) : type === 'success' ? (
      <SuccessIcon />
    ) : null;
  }, [type, icon]);

  // 关闭notifiction的回调
  const handleClose = () => {
    removeCurrentNotificationDom(currentRenderId);
    onClose?.();
  };

  // 点击 notification 的回调
  const handleClick = () => {
    onClick?.();
  };

  useEffect(() => {
    if (duration === 0) {
      return;
    }
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      handleClose();
    }, duration * 1000);
  }, [duration]);

  return (
    <div
      className={notificationClass}
      style={style}
      onClick={() => handleClick()}
    >
      <div className="happy-notification-wrapper">
        <div className="happy-notification-info-icon">{infoIcon}</div>
        <div className="happy-notification-content">
          <div className="happy-notification-content-header">{message}</div>
          <div className="happy-notification-content-description">
            {description}
          </div>
        </div>
        <div
          className="happy-notification-close-icon"
          onClick={() => handleClose()}
        >
          {closeIcon}
        </div>
      </div>
      {footer && <div className="happy-notification-footer">{footer}</div>}
    </div>
  );
};

// 移除当前notification的dom元素
function removeCurrentNotificationDom(key: string) {
  const dom = document.getElementById(key);
  if (dom) {
    document.body.removeChild(dom);
  }
}

// 创建容器
function createContainer(placement: TPlacement, key: string) {
  let container = document.getElementById(key);
  if (!container) {
    container = document.createElement('div');
    container.setAttribute('id', key);
    container.setAttribute(
      'class',
      `happy-notification-container happy-notification-container-${placement}`,
    );
    document.body.appendChild(container);
  }
  return container;
}

// 添加提示
function addNotification(params: INotificationConfigProps) {
  const container = createContainer(params.placement || 'topRight', params.key);
  const containerRoot = createRoot(container);
  containerRoot.render(
    <BaseNotification
      {...params}
      currentRenderId={params.key}
      key={params.key}
    />,
  );
}

// 销毁提示
function destoryNotification(key: string) {
  removeCurrentNotificationDom(key);
}

const Notification: INotificationProps = {
  open: (params: INotificationConfigProps) => addNotification(params),
  error: (params: INotificationConfigProps) =>
    addNotification({
      ...params,
      type: 'error',
    }),
  warn: (params: INotificationConfigProps) =>
    addNotification({
      ...params,
      type: 'warning',
    }),
  success: (params: INotificationConfigProps) =>
    addNotification({
      ...params,
      type: 'success',
    }),
  destory: (key: string) => destoryNotification(key),
};

export default Notification;

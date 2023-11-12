import { Button, Notification, Space } from 'happy-ui';
import React from 'react';

type TPlacement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
type TNotificationType = 'info' | 'warning' | 'success' | 'error';

export default () => {
  const showNotifications = (
    placement: TPlacement,
    box: string,
    type: TNotificationType,
    duration: number,
  ) => {
    Notification.open({
      key: box,
      message: 'Basic Notification Message',
      description: 'Basic Notification Description',
      placement,
      type,
      duration,
    });
  };
  return (
    <Space>
      <Button
        type="primary"
        onClick={() => showNotifications('topRight', 'box1', 'info', 0)}
      >
        0秒不关闭
      </Button>
      <Button
        type="primary"
        onClick={() => showNotifications('topLeft', 'box2', 'error', 10)}
      >
        10秒后关闭
      </Button>
    </Space>
  );
};

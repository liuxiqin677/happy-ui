import { Button, Notification, Space } from 'happy-ui';
import React from 'react';

type TPlacement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
type TNotificationType = 'info' | 'warning' | 'success' | 'error';

export default () => {
  const showNotifications = (
    placement: TPlacement,
    box: string,
    type: TNotificationType,
  ) => {
    Notification.open({
      key: box,
      message: 'Basic Notification Message',
      description: 'Basic Notification Description',
      placement,
      type,
    });
  };
  return (
    <Space>
      <Button
        type="primary"
        onClick={() => showNotifications('topRight', 'box1', 'info')}
      >
        Info
      </Button>
      <Button
        type="primary"
        onClick={() => showNotifications('topLeft', 'box2', 'error')}
      >
        Error
      </Button>
      <Button
        type="primary"
        onClick={() => showNotifications('bottomRight', 'box3', 'success')}
      >
        Success
      </Button>
      <Button
        type="primary"
        onClick={() => showNotifications('bottomLeft', 'box4', 'warning')}
      >
        Warning
      </Button>
    </Space>
  );
};

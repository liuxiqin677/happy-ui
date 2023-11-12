import { Button, Notification, Space } from 'happy-ui';
import React from 'react';

type TPlacement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

export default () => {
  const showNotifications = (placement: TPlacement, box: string) => {
    Notification.open({
      key: box,
      message: 'Basic Notification Message',
      description: 'Basic Notification Description',
      placement,
    });
  };
  return (
    <Space>
      <Button
        type="primary"
        onClick={() => showNotifications('topRight', 'box1')}
      >
        topRight
      </Button>
      <Button
        type="primary"
        onClick={() => showNotifications('topLeft', 'box2')}
      >
        topLeft
      </Button>
      <Button
        type="primary"
        onClick={() => showNotifications('bottomRight', 'box3')}
      >
        bottomRight
      </Button>
      <Button
        type="primary"
        onClick={() => showNotifications('bottomLeft', 'box4')}
      >
        bottomLeft
      </Button>
    </Space>
  );
};

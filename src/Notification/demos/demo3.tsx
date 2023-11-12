import { Button, Notification, Space } from 'happy-ui';
import React from 'react';

type TPlacement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

export default () => {
  const showNotification1 = (placement: TPlacement) => {
    Notification.open({
      key: 'box1',
      message: 'Basic Notification Message',
      description: 'Basic Notification Description',
      placement,
    });
  };
  const showNotification2 = (placement: TPlacement) => {
    Notification.success({
      key: 'box1',
      message: 'Basic Notification Message',
      description: 'Basic Notification Description',
      placement,
    });
  };
  const showNotification3 = (placement: TPlacement) => {
    Notification.error({
      key: 'box1',
      message: 'Basic Notification Message',
      description: 'Basic Notification Description',
      placement,
    });
  };
  const showNotification4 = (placement: TPlacement) => {
    Notification.warn({
      key: 'box1',
      message: 'Basic Notification Message',
      description: 'Basic Notification Description',
      placement,
    });
  };

  return (
    <Space>
      <Button type="primary" onClick={() => showNotification1('topRight')}>
        topRight
      </Button>
      <Button type="primary" onClick={() => showNotification2('topLeft')}>
        topLeft
      </Button>
      <Button type="primary" onClick={() => showNotification3('bottomRight')}>
        bottomRight
      </Button>
      <Button type="primary" onClick={() => showNotification4('bottomLeft')}>
        bottomLeft
      </Button>
    </Space>
  );
};

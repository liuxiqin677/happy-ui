import { Button, Flex, Notification } from 'happy-ui';
import React from 'react';

export default () => {
  const handleClose = (key: string) => {
    Notification.destory(key);
  };

  const footer = (
    <Flex justify="flex-end">
      <Button onClick={() => handleClose('box1')}>取消</Button>
      <Button
        type="primary"
        style={{ marginLeft: '8px' }}
        onClick={() => handleClose('box1')}
      >
        确定
      </Button>
    </Flex>
  );

  const showNotifications = () => {
    Notification.open({
      key: 'footer1',
      message: 'Basic Notification Message',
      description: 'Basic Notification Description',
      footer: footer,
    });
  };

  return (
    <Button type="primary" onClick={() => showNotifications()}>
      show Notification
    </Button>
  );
};

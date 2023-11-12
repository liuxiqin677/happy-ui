import { Button, Flex, Notification } from 'happy-ui';
import React from 'react';

export default () => {

  const showNotifications = () => {
    Notification.open({
      key: 'style1',
      message: 'Basic Notification Message',
      description: 'Basic Notification Description',
      style: {
        width: '500px',
        color: 'red'
      }
    });
  };

  return (
    <Button type="primary" onClick={() => showNotifications()}>
      show Notification
    </Button>
  );
};

import { Button, Message, Space } from 'happy-ui';
import React from 'react';

export default () => {
  return (
    <Space>
      <Button
        type="primary"
        onClick={() => {
          Message.info({
            content: 'hello Happy-ui',
          });
        }}
      >
        Info Message
      </Button>
    </Space>
  );
};

import { Button, Message, Space } from 'happy-ui';
import React from 'react';

export default () => {
  return (
    <Space>
      <Button
        type="primary"
        onClick={() => {
          Message.success({
            content: 'hello Happy-ui',
            duration: 10,
          });
        }}
      >
        10s delay Message
      </Button>
      <Button
        onClick={() => {
          Message.success({
            content: 'hello Happy-ui',
            duration: 0,
          });
        }}
      >
        never hide Message
      </Button>
    </Space>
  );
};

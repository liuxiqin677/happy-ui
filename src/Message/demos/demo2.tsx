import { Button, Message, Space } from 'happy-ui';
import React from 'react';

export default () => {
  return (
    <Space>
      <Button
        style={{ color: '#1677ff' }}
        onClick={() => {
          Message.info({
            content: 'hello Happy-ui',
          });
        }}
      >
        Info Message
      </Button>
      <Button
        style={{ color: '#ff4d4f' }}
        onClick={() => {
          Message.error({
            content: 'hello Happy-ui',
          });
        }}
      >
        Error Message
      </Button>
      <Button
        style={{ color: '#52c41a' }}
        onClick={() => {
          Message.success({
            content: 'hello Happy-ui',
          });
        }}
      >
        Success Message
      </Button>
      <Button
        style={{ color: '#faad14' }}
        onClick={() => {
          Message.warn({
            content: 'hello Happy-ui',
          });
        }}
      >
        Warning Message
      </Button>
    </Space>
  );
};

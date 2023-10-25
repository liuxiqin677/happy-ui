import { Button, Message, Space } from 'happy-ui';
import React from 'react';

export default () => {
  return (
    <Space>
      <Button
        type="primary"
        onClick={() => {
          Message.open({
            content: 'hello Happy-ui',
          });
        }}
      >
        Default (Info) Message
      </Button>
      <Button
        onClick={() => {
          Message.open({
            type: 'success',
            content: 'hello Happy-ui',
          });
        }}
      >
        Success Message
      </Button>
      <Button
        onClick={() => {
          Message.success({
            content: 'hello Happy-ui',
          });
        }}
      >
        Error Message
      </Button>
      <Button
        onClick={() => {
          Message.warn({
            key: 'open_warning',
            content: 'hello Happy-ui',
          });
          setTimeout(() => {
            Message.update({
              content: 'hello Jolyne!',
              key: 'open_warning',
            });
          }, 1000);
        }}
      >
        Warning Message
      </Button>
    </Space>
  );
};

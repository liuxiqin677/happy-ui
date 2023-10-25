import React, { useState } from 'react';
import { Message, Button, Space } from 'happy-ui';

export default () => { 
  return (
    <Space>
      <Button 
        type='primary' 
        onClick={() => {
          Message.success({
            content: 'hello Happy-ui',
            key: 'update_success',
          })
          setTimeout(() => {
            Message.update({
              content: 'hello Jolyne!',
              key: 'update_success',
              duration: 10
            })
          }, 1000)
        }}
      >
        update Message
      </Button>
    </Space>
  )
}
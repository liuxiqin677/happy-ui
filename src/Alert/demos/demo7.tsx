import { Alert, Button, Space } from 'happy-ui';
import React from 'react';

export default () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Alert
        message="Success Tips"
        type="success"
        showIcon
        action={
          <Button size="small" type="text">
            UNDO
          </Button>
        }
        closable
      />
      <Alert
        message="Error Text"
        showIcon
        description="Error Description Error Description Error Description Error Description"
        type="error"
        action={
          <Button size="small" danger>
            Detail
          </Button>
        }
      />
      <Alert
        message="Warning Text"
        type="warning"
        action={
          <Space>
            <Button type="text" size="small" ghost>
              Done
            </Button>
          </Space>
        }
        closable
      />
      <Alert
        message="Info Text"
        description="Info Description Info Description Info Description Info Description"
        type="info"
        action={
          <Space direction="vertical">
            <Button size="small" type="primary">
              Accept
            </Button>
            <Button size="small" danger ghost>
              Decline
            </Button>
          </Space>
        }
        closable
      />
    </Space>
  );
};

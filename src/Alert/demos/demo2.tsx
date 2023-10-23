import React from 'react';
import { Alert, Space } from 'happy-ui';

export default () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Alert message="Success Text" type="success" />
      <Alert message="Info Text" type="info" />
      <Alert message="Warning Text" type="warning" />
      <Alert message="Error Text" type="error" />
    </Space>
  )
}
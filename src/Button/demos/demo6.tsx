import { Button, Space } from 'happy-ui';
import React from 'react';

export default () => {
  return (
    <Space>
      <Button type='primary' danger>Primary Button</Button>
      <Button danger>Default Button</Button>
      <Button type='dashed' danger>Dashed Button</Button>
      <Button type='text' danger>Text Button</Button>
      <Button type='link' danger>Link Button</Button>
    </Space>
  )
}
import { Button, Space } from 'happy-ui';
import React from 'react';

export default () => {
  return (
    <Space
      style={{
        backgroundColor: 'rgb(190, 200, 200)',
        padding: '16px'
      }}
    >
      <Button type='primary' ghost>Primary Button</Button>
      <Button ghost>Default Button</Button>
      <Button type='dashed' ghost>Dashed Button</Button>
      <Button type='primary' danger ghost>Danger Button</Button>
    </Space>
  )
}
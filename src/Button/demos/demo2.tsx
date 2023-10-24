import { Button, Space } from 'happy-ui';
import React from 'react';

export default () => (
    <Space>
      <Button type='primary' size="large">Large</Button>
      <Button size="default">Default</Button>
      <Button>Default</Button>
      <Button type='dashed' size="small">Small</Button>
    </Space>
)
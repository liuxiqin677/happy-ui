import { Button, Space } from 'happy-ui';
import React from 'react';

export default () => (
    <Space>
      <Button type='primary' disabled onClick={() => { alert('不会触发') }}>Primary Button</Button>
      <Button size="default" disabled>Default Button</Button>
      <Button type='dashed' disabled>Dashed Button</Button>
      <Button type='text' disabled>Text Button</Button>
      <Button type='link' disabled>Link Button</Button>
    </Space>
)
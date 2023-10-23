import { Button, Space } from 'happy-ui';
import React from 'react';

export default () => {
  return (
    <Space
      direction='vertical'
      style={{
        width: '100%',
      }}
    >
      <Button type='primary' block>Primary Button</Button>
      <Button block>Default Button</Button>
      <Button type='dashed' block>Dashed Button</Button>
      <Button disabled block>Disabeld Button</Button>
      <Button type="text" block>text</Button>
      <Button type="link" block>Link</Button>
    </Space>
  )
}
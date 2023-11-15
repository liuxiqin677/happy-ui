import { Space, Tag } from 'happy-ui';
import React from 'react';

export default () => {
  return (
    <Space>
      <Tag color="success">success</Tag>
      <Tag color="processing">processing</Tag>
      <Tag color="error">error</Tag>
      <Tag color="warning">warning</Tag>
      <Tag color="default">default</Tag>
    </Space>
  );
};

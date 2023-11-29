import { Breadcrumb } from 'happy-ui';
import React from 'react';

export default () => {
  return (
    <div>
      <Breadcrumb style={{ fontSize: 10 }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Menu</Breadcrumb.Item>
        <Breadcrumb.Item>Introduce</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
};

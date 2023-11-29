import { Breadcrumb } from 'happy-ui';
import React from 'react';

export default () => {
  return (
    <div>
      <Breadcrumb maxCount={3}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Menu</Breadcrumb.Item>
        <Breadcrumb.Item>Introduce</Breadcrumb.Item>
        <Breadcrumb.Item>News</Breadcrumb.Item>
        <Breadcrumb.Item>Channel</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
};

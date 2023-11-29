import { Breadcrumb, Button } from 'happy-ui';
import React from 'react';

export default () => {
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>
          <a href="#" style={{ color: '#1890ff' }}>
            Home
          </a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Button style={{ height: 25 }}>Menu</Button>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Introduce</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
};

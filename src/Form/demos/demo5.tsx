import { Form, Input } from 'happy-ui';
import React from 'react';

export default () => {
  return (
    <div>
      <Form layout="horizontal" style={{ width: '600px' }}>
        <Form.Item label="Username" field="username" disabled>
          <Input placeholder="Please enter your usename" width={300} />
        </Form.Item>
        <Form.Item label="Post" field="post">
          <Input placeholder="Please enter your post" width={300} />
        </Form.Item>
      </Form>
    </div>
  );
};

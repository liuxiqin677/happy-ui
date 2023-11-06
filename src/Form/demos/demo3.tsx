import { Button, Form, Input, Space } from 'happy-ui';
import React, { useRef } from 'react';

export default () => {
  const form = Form.useForm();
  const formRef = useRef();

  return (
    <div>
      <Form layout="horizontal" formField={formRef} style={{ width: '600px' }}>
        <Form.Item label="Username" field="username">
          <Input placeholder="Please enter your usename" width={300} />
        </Form.Item>
        <Form.Item label="Post" field="post">
          <Input placeholder="Please enter your post" width={300} />
        </Form.Item>
        <Form.Item wrapperTol={5}>
          <Space>
            <Button type="primary">Submit</Button>
            <Button
              onClick={() => form.resetFields(formRef)}
              style={{ margin: '0 10px' }}
            >
              Reset
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

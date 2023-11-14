import { Button, Form, Input } from 'happy-ui';
import React, { useRef } from 'react';
import { IFormRef } from '../interface';

export default () => {
  const formRef = useRef<IFormRef>(null);

  const submit = async () => {
    const submitParams = await formRef.current?.submit();
    console.log(submitParams);
  };

  return (
    <Form
      ref={formRef}
      style={{ width: '600px' }}
    >
      <Form.Item label="Username" field="username">
        <Input placeholder="Please enter your usename" width={300} />
      </Form.Item>
      <Form.Item label="Post" field="post">
        <Input placeholder="Please enter your post" width={300} />
      </Form.Item>
      <Form.Item wrapperTol={5}>
        <Button type="primary" onClick={submit}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

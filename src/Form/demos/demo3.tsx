import { Button, Form, Input, Space } from 'happy-ui';
import React, { useRef } from 'react';
import { IFormRef } from '../interface';

export default () => {
  const formRef = useRef<IFormRef>();

  const submit = async () => {
    const params = await formRef.current?.submit()
    console.log(params)
  }

  const reset = () => {
    formRef.current?.resetFields()
  }

  return (
    <div>
      <Form layout="horizontal" ref={formRef} style={{ width: '600px' }}>
        <Form.Item label="Username" field="username">
          <Input placeholder="Please enter your usename" width={300} />
        </Form.Item>
        <Form.Item label="Post" field="post">
          <Input placeholder="Please enter your post" width={300} />
        </Form.Item>
        <Form.Item wrapperTol={5}>
          <Space>
            <Button type="primary" onClick={() => submit()}>Submit</Button>
            <Button 
              onClick={() => reset()}
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

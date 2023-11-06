import { Button, Form, Input } from 'happy-ui';
import React, { useRef } from 'react';

export default () => {
  const form = Form.useForm(); // 拿到 form实例对象
  const formRef = useRef(); // 调用端设一个ref，保证单页面多表单唯一性

  const submit = async () => {
    const submitParams = await form.onSubmit(formRef);
    console.log(submitParams);
  };

  return (
    <Form formField={formRef} style={{ width: '600px' }}>
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

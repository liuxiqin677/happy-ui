import { Button, Form, Input, Message, Space } from 'happy-ui';
import React, { useRef } from 'react';
import { IFormRef } from '../interface';

export default function index1() {
  const formRef = useRef<IFormRef>(null); // 调用端设一个ref，保证单页面多表单唯一性

  const submit = async () => {
    const submitParams = await formRef.current?.submit();
    if (submitParams.submitResult) {
      Message.success({
        content: '注册成功',
      });
    } else {
      Message.error({
        content: '注册失败',
      });
    }
  };

  const reset = () => {
    formRef.current?.resetFields()
  }

  return (
    <div>
      <Form layout="horizontal" ref={formRef} style={{ width: '600px' }}>
        <Form.Item
          label="Username"
          field="username"
          rules={[
            { required: true, message: '请输入用户名' },
            { maxLength: 10, message: '最大长度为10位' },
            { minLength: 3, message: '最小长度为3位' },
            { fn: (a: string) => a.includes('a'), message: '用户名必须包含a' },
          ]}
        >
          <Input placeholder="Please enter your usename" width={300} />
        </Form.Item>
        <Form.Item label="Post" field="post">
          <Input placeholder="Please enter your post" width={300} />
        </Form.Item>
        <Form.Item wrapperTol={5}>
          <Space>
            <Button type="primary" onClick={submit}>
              Submit
            </Button>
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
}

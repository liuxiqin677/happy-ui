import { Form, Input, Radio, Space } from 'happy-ui';
import React, { useState } from 'react';

const options = [
  { label: '禁用', value: 'disabled' },
  { label: '不禁用', value: 'Undisabled' },
];

export default () => {
  const [disabled, setDisabled] = useState<boolean>(true);
  const [radio, setRadio] = useState<string>('disabled');
  const onChange = (value: string) => {
    setRadio(value);
    setDisabled(value === 'disabled' ? true : false);
  };

  return (
    <Space direction="vertical">
      <Radio.Group options={options} onChange={onChange} value={radio} />
      <Form
        disabled={disabled}
        layout="horizontal"
        style={{ width: '600px' }}
      >
        <Form.Item label="Username" field="username">
          <Input placeholder="Please enter your usename" width={300} />
        </Form.Item>
        <Form.Item label="Post" field="post">
          <Input placeholder="Please enter your post" width={300} />
        </Form.Item>
      </Form>
    </Space>
  );
};

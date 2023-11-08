import { Input, Space } from 'happy-ui';
import React, { useState } from 'react';

export default () => {
  const [value, setValue] = useState<string>('');
  const onChange = (value: string | number) => {
    console.log('password', value);
  };

  return (
    <Space direction="vertical">
      <span>输入框的值：{value}</span>
      <Input
        placeholder="请输入"
        value={value}
        onChange={(value) => {
            setValue(value)
        }}
      />
    </Space>
  );
};

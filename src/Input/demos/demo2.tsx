import { Input } from 'happy-ui';
import React from 'react';

export default () => {
  const onChange = (value: string | number) => {
    console.log('password', value);
  };

  return (
    <Input
      placeholder="请输入"
      type="password"
      showTogglePwd
      onChange={(value) => onChange(value)}
    />
  );
};

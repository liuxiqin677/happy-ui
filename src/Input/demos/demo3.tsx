import React from 'react';
import { Input } from 'happy-ui';

export default () => {
  const onChange = (value: string) => {
    console.log(value);
  };
  return <Input placeholder="请输入" showClear onChange={onChange} />;
}

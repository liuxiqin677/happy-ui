import { Input } from 'happy-ui';
import React from 'react';

export default () => {
  const onChange = (value: string | number) => {
    console.log('value', value);
  };

  return <Input placeholder="请输入" onChange={(value) => onChange(value)} />;
};

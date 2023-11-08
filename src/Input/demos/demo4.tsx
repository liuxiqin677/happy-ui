import React from 'react';
import { Input } from 'happy-ui';

export default () => {
  const onChange = (value: string) => {
    console.log('value', value);
  };
  const onNumberChange = (value: string) => {
    console.log('numberValue', value);
  };
  return (
    <Input
      type="num"
      placeholder="请输入"
      min={0}
      max={10}
      step={1.5}
      onChange={onChange}
      onNumberChange={onNumberChange}
    />
  );
}

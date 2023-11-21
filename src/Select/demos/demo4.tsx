import { Select } from 'happy-ui';
import React from 'react';

export default () => {
  const option = [
    {
      label: 'Lucy',
      value: 'lucy',
      disabled: true,
    },
    {
      label: 'Mike',
      value: 'mike',
      disabled: true,
    },
    {
      label: 'Jack',
      value: 'jack',
    },
  ];
  const handleSelectCallback = (v: number) => {
    console.log(v);
  };
  return (
    <Select
      option={option}
      onSelect={handleSelectCallback}
      placeholder="请选择"
    />
  );
}

import { Select } from 'happy-ui';
import React from 'react';

export default () => {
  const option = [
    {
      label: 'Lucy',
      value: 'lucy',
    },
    {
      label: 'Mike',
      value: 'mike',
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
      loading
      onSelect={handleSelectCallback}
      placeholder="请选择"
    />
  );
}

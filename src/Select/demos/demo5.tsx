import { Select } from 'happy-ui';
import React from 'react';

export default () => {
  const option = [
    {
      label: 'Mucy',
      value: 'mucy',
    },
    {
      label: 'Mike',
      value: 'mike',
    },
    {
      label: 'aMck',
      value: 'amck',
    },
  ];
  const handleSelectCallback = (v: number) => {
    console.log(v);
  };
  const handleTextChange = (v: number) => {
    console.log(v);
  };
  return (
    <Select
      option={option}
      onSelect={handleSelectCallback}
      onChange={handleTextChange}
      showSearch
      placeholder="请输入"
      clearable
    />
  );
};

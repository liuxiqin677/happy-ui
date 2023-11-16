import { CheckBox } from 'happy-ui';
import React from 'react';

export default () => {
  const onChange = (value: boolean) => {
    console.log(value ? '选中了' : '取消选中了');
  };
  return <CheckBox onChange={onChange}>Checkbox</CheckBox>;
};

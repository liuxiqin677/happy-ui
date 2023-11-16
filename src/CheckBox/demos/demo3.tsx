import { CheckBox } from 'happy-ui';
import React from 'react';

export default () => {
  const onChange = (checkedValues: Array<string | number>) => {
    console.log('checkedValues', checkedValues);
  };

  return (
    <CheckBox.Group
      options={[
        { label: 'Apple', value: 'Apple' },
        { label: 'Pear', value: 'Pear' },
        { label: 'Orange', value: 'Orange' },
      ]}
      defaultValue={['Apple']}
      onChange={onChange}
    />
  );
};

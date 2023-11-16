import { Button, CheckBox, Space } from 'happy-ui';
import React, { useState } from 'react';

export default () => {
  const [disabled, setDisabled] = useState<boolean>(false);
  const onChange = (checkedValues: Array<string | number>) => {
    console.log('checkedValues', checkedValues);
  };

  return (
    <Space direction="vertical">
      <Button type="primary" onClick={() => setDisabled(!disabled)}>
        Toggle Disabled
      </Button>
      <CheckBox.Group
        options={[
          { label: 'Apple', value: 'Apple', disabled: disabled },
          { label: 'Pear', value: 'Pear' },
          { label: 'Orange', value: 'Orange' },
        ]}
        defaultValue={['Apple']}
        onChange={onChange}
      />
    </Space>
  );
};

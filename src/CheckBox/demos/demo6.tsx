import { Button, CheckBox, Space } from 'happy-ui';
import React, { useState } from 'react';

export default () => {
  const [indeterminate, setIndeterminate] = useState<boolean>(false);
  const onChange = (checkedValues: Array<string | number>) => {
    console.log('checkedValues', checkedValues);
  };

  return (
    <Space direction="vertical">
      <Button type="primary" onClick={() => setIndeterminate(!indeterminate)}>
        Toggle Indeterminate
      </Button>
      <CheckBox.Group
        indeterminate={indeterminate}
        options={[
          { label: 'Apple', value: 'Apple' },
          { label: 'Pear', value: 'Pear' },
          { label: 'Orange', value: 'Orange' },
        ]}
        defaultValue={['Apple']}
        onChange={onChange}
      />
    </Space>
  );
};

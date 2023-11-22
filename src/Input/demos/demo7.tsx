import { Button, Input, Space } from 'happy-ui';
import React, { useState } from 'react';

export default () => {
  const [disabled, setDisabled] = useState<boolean>(false);
  const onChange = (value: string | number) => {
    console.log('value', value);
  };

  return (
    <Space direction='vertical' size={24}>
      <Button
        type="primary"
        onClick={() => setDisabled((prev: boolean) => !prev)}
      >
        Toggle Disabled
      </Button>
      <Input
        disabled={disabled}
        placeholder="请输入"
        onChange={(value) => onChange(value)}
      />
    </Space>
  );
};

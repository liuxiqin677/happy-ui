import { Button, CheckBox, Space } from 'happy-ui';
import React, { useState } from 'react';

export default () => {
  const [disabled, setDisabled] = useState<boolean>(true);

  return (
    <Space direction="vertical">
      <Button type="primary" onClick={() => setDisabled(!disabled)}>
        Toggle Disabled
      </Button>
      <CheckBox disabled={disabled}>Checkbox</CheckBox>
    </Space>
  );
};

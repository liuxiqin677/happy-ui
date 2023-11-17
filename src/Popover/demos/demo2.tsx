import { Button, Popover, Radio, Space } from 'happy-ui';
import React, { useState } from 'react';

type Placement = 'left' | 'right' | 'top' | 'bottom';

export default () => {
  const [position, setPosition] = useState<Placement>('left');
  const content = <div>Content</div>;
  return (
    <Space direction="vertical" size={24}>
      <Radio.Group
        options={[
          {
            label: 'left',
            value: 'left',
          },
          {
            label: 'right',
            value: 'right',
          },
          {
            label: 'top',
            value: 'top',
          },
          {
            label: 'bottom',
            value: 'bottom',
          },
        ]}
        value={position}
        onChange={(value: Placement) => setPosition(value)}
      />
      <Popover content={content} title="Title" placement={position}>
        <Button type="primary">Hover me</Button>
      </Popover>
    </Space>
  );
};

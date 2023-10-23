import React, { useState } from 'react';
import { Button, Space } from 'happy-ui';

type SizeType = 'small' | 'middle' | 'large' | undefined;

export default () => {
  const [size, setSize] = useState<SizeType | [SizeType, SizeType] | 'customize'>('small');

  return (
    <Space direction="vertical" size="middle">
      <Space>
        {['small', 'middle', 'large'].map((item) => (
          <Button 
            style={size === item ? {border: '1px solid #4096ff'} : {}} 
            key={item} 
            onClick={() => setSize(item as SizeType)}
          >
            {item}
          </Button>
        ))}
      </Space>
      <br />
      <Space size={size as SizeType}>
        <Button type="primary">Primary</Button>
        <Button>Default</Button>
        <Button type="dashed">Dashed</Button>
        <Button type="link">Link</Button>
      </Space>
    </Space>
  );
};
import { Flex, Radio } from 'happy-ui';
import React from 'react';

const baseStyle: React.CSSProperties = {
  width: '25%',
  height: 54,
};

export default () => {
  const [value, setValue] = React.useState<string>('horizontal');
  return (
    <Flex gap="middle" vertical>
      <Radio.Group value={value} onChange={(value: any) => setValue(value)}>
        <Radio value="horizontal">horizontal</Radio>
        <Radio value="vertical">vertical</Radio>
      </Radio.Group>
      <Flex vertical={value === 'vertical'} flex='1 1 2px'>
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            style={{
              ...baseStyle,
              backgroundColor: i % 2 ? '#1677ff' : '#1677ffbf',
            }}
          />
        ))}
      </Flex>
    </Flex>
  );
};

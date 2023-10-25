import { Button, Flex, Radio } from 'happy-ui';
import { TRadioOptions } from 'happy-ui/RadioGroup';
import React, { useState } from 'react';

const boxStyle: React.CSSProperties = {
  width: '100%',
  height: 120,
  borderRadius: 6,
  border: '1px solid #40a9ff',
};

const justifyOptions: TRadioOptions = [
  { label: 'flex-start', value: 'flex-start' },
  { label: 'center', value: 'center' },
  { label: 'flex-end', value: 'flex-end' },
  { label: 'space-between', value: 'space-between' },
  { label: 'space-around', value: 'space-around' },
  { label: 'space-evenly', value: 'space-evenly' },
];

const alignOptions: TRadioOptions = [
  { label: 'flex-start', value: 'flex-start' },
  { label: 'center', value: 'center' },
  { label: 'flex-end', value: 'flex-end' },
];

export default () => {
  const [justify, setJustify] = useState<string>('flex-start');
  const [align, setAlign] = useState<string>('flex-start');

  return (
    <Flex gap="middle" vertical>
      <Radio.Group
        options={justifyOptions}
        value={justify}
        onChange={(value: any) => setJustify(value)}
      />
      <Radio.Group
        options={alignOptions}
        value={align}
        onChange={(value: any) => setAlign(value)}
      />
      <Flex style={boxStyle} justify={justify} align={align}>
        <Button type="primary">Primary</Button>
        <Button type="primary">Primary</Button>
        <Button type="primary">Primary</Button>
        <Button type="primary">Primary</Button>
      </Flex>
    </Flex>
  );
};

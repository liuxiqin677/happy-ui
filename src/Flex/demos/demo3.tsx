import { Button, Flex, Radio } from 'happy-ui';
import React, { useState } from 'react';

type SizeType = 'large' | 'small' | 'middle';

const App: React.FC = () => {
  const [gapSize, setGapSize] = useState<SizeType>('small');
  return (
    <Flex gap="middle" vertical>
      <Radio.Group
        options={[
          {
            label: 'small',
            value: 'small',
          },
          {
            label: 'middle',
            value: 'middle',
          },
          {
            label: 'large',
            value: 'large',
          },
        ]}
        value={gapSize}
        onChange={(value: SizeType) => setGapSize(value)}
      />
      <Flex gap={gapSize}>
        <Button type="primary">Primary</Button>
        <Button>Default</Button>
        <Button type="dashed">Dashed</Button>
        <Button type="link">Link</Button>
      </Flex>
    </Flex>
  );
};

export default App;

import { Button, Flex } from 'happy-ui';
import React from 'react';

const Demo: React.FC = () => (
  <Flex wrap="wrap" gap="small">
    {Array.from({ length: 32 }, (_, i) => (
      <Button key={i} type="primary">
        Button
      </Button>
    ))}
  </Flex>
);

export default Demo;

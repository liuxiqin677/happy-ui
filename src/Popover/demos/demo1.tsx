import { Button, Popover } from 'happy-ui';
import React from 'react';

export default () => {
  const content = <div>Content</div>;
  return (
    <Popover content={content} title="Title">
      <Button type="primary">Hover me</Button>
    </Popover>
  );
};

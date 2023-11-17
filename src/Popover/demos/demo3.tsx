import { Button, Popover } from 'happy-ui';
import React from 'react';

export default () => {
  const content = <div>Content</div>;
  return (
    <Popover content={content} title="Title" trigger="click">
      <Button type="primary">Click me</Button>
    </Popover>
  );
};

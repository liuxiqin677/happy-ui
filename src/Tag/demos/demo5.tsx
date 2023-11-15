import { Tag } from 'happy-ui';
import React from 'react';

export default () => {
  const handleClose = (e: React.MouseEvent) => {
    console.log('标签关闭了', e);
  };

  return (
    <>
      <Tag color="warning" closeable onClose={handleClose}>
        warning
      </Tag>
    </>
  );
};

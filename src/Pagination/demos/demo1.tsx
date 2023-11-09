import { Pagination } from 'happy-ui';
import React from 'react';

export default () => {
  const onchange = (page: number, pageSize: number) => {
    console.log(page, pageSize);
  };
  return (
    <Pagination
      total={60}
      onChange={(page, pageSize) => onchange(page, pageSize)}
    />
  );
};

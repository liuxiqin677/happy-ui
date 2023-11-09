import { Pagination } from 'happy-ui';
import React from 'react';

export default () => {
  const onchange = (page: number, pageSize: number) => {
    console.log(page, pageSize);
  };
  return (
    <Pagination
      total={500}
      defaultCurrent={18}
      onChange={(page, pageSize) => onchange(page, pageSize)}
    />
  );
};

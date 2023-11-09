import { Pagination } from 'happy-ui';
import React from 'react';

export default () => {
  const onChange = (page: number, pageSize: number) => {
    console.log(page, pageSize);
  };
  
  return (
    <Pagination
      total={200}
      showQuickJumper
      onChange={(page: number, pageSize: number) => onChange(page, pageSize)}
    />
  );
};

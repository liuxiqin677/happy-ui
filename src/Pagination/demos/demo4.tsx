import { Pagination } from 'happy-ui';
import React from 'react';

export default () => {
  const options = [10, 20, 30, 50];
  const changePageCallback = (current: number, pageNum: number) => {
    console.log(current, pageNum);
  };
  return (
    <Pagination
      total={200}
      showSizeChanger
      pageSizeOptions={options}
      onShowSizeChange={changePageCallback}
    />
  );
};

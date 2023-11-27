import { Radio, Table } from 'happy-ui';
import React, { useState } from 'react';

type TPosition = 'left' | 'right' | 'center';

export default () => {
  const columns = [
    {
      title: 'Name',
      key: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Age',
      key: 'Age',
      dataIndex: 'age',
      // width: '300'
    },
    {
      title: 'Address',
      key: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Email',
      key: 'Email',
      dataIndex: 'email',
    },
  ];

  const data = new Array(10000).fill({
    name: 'Jane Doe',
    age: 23,
    address: '32 Park Road, London',
    email: 'jane.doe@example.com',
  });

  const [value, setValue] = useState<TPosition>('right');

  const pageNumberChange = (pageNum: number, data: Array<object>) => {
    console.log(pageNum, data);
  };

  const pageSizeChange = (pageSize: number, data: Array<object>) => {
    console.log(pageSize, data);
  };

  return (
    <>
      <Radio.Group
        options={[
          {
            label: 'left',
            value: 'left',
          },
          {
            label: 'center',
            value: 'center',
          },
          {
            label: 'right',
            value: 'right',
          },
        ]}
        value={value}
        onChange={(value) => {
          setValue(value);
        }}
        style={{
            marginBottom: '24px'
        }}
      />
      <Table
        pagination
        paginationAlign={value}
        columns={columns}
        data={data}
        onPageNumberChange={pageNumberChange}
        onPageSizeChange={pageSizeChange}
      />
    </>
  );
};

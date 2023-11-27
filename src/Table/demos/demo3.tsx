import { Table } from 'happy-ui';
import React from 'react';

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

  const data = [
    {
      name: 'Jane Doe',
      age: 23,
      address: '32 Park Road, London',
      email: 'jane.doe@example.com',
    },
    {
      name: 'Alisa Ross',
      age: 19,
      address: '35 Park Road, London',
      email: 'alisa.ross@example.com',
    },
    {
      name: 'Kevin Sandra',
      age: 33,
      address: '31 Park Road, London',
      email: 'kevin.sandra@example.com',
    },
    {
      name: 'Ed Hellen',
      age: 44,
      address: '42 Park Road, London',
      email: 'ed.hellen@example.com',
    },
    {
      name: 'William Smith',
      age: 55,
      address: '62 Park Road, London',
      email: 'william.smith@example.com',
    },
  ];
  
  return (
    <>
      <Table
        columns={columns}
        data={data}
        expandedRowRender={(reacord: { name: string }) =>
          `Th is No.${reacord.name} description.`
        }
      />
    </>
  );
};

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
      width: 150
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

  return <Table virtualized columns={columns} data={data} />;
};

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
    {
      title: 'Gender',
      key: 'Gender',
      dataIndex: 'gender',
      render: (row: any) => (
        <span
          style={{
            color: 'red',
          }}
        >
          {row.gender}
        </span>
      ),
    },
    {
      title: 'Action',
      key: 'Action',
      dataIndex: 'action',
      render: (row: any) => (
        <>
          <span
            style={{
              color: '#1677ff',
              cursor: 'pointer'
            }}
            onClick={() => console.log('edit', row)}
          >
            edit
          </span>
          <span
            style={{
              color: 'red',
              cursor: 'pointer',
              marginLeft: '8px'
            }}
            onClick={() => console.log('delete', row)}
          >
            delete
          </span>
        </>
      ),
    },
  ];

  const data = [
    {
      name: 'Jane Doe',
      age: 23,
      address: '32 Park Road, London',
      email: 'jane.doe@example.com',
      gender: 'male',
    },
    {
      name: 'Alisa Ross',
      age: 19,
      address: '35 Park Road, London',
      email: 'alisa.ross@example.com',
      gender: 'male',
    },
    {
      name: 'Kevin Sandra',
      age: 33,
      address: '31 Park Road, London',
      email: 'kevin.sandra@example.com',
      gender: 'female',
    },
    {
      name: 'Ed Hellen',
      age: 44,
      address: '42 Park Road, London',
      email: 'ed.hellen@example.com',
      gender: 'male',
    },
    {
      name: 'William Smith',
      age: 55,
      address: '62 Park Road, London',
      email: 'william.smith@example.com',
      gender: 'female',
    },
  ];
  return <Table columns={columns} data={data} />;
};

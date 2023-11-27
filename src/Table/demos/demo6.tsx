import { Table } from 'happy-ui';
import React from 'react';

export default () => {
  const columns = [
    {
      title: 'Name',
      key: 'Name',
      dataIndex: 'name',
      width: '200',
    },
    {
      title: 'Age',
      key: 'Age',
      dataIndex: 'age',
      sorter: true, // 默认排序，根据原生sort排序
    },
    {
      title: 'Address',
      key: 'Address',
      dataIndex: 'address',
      sorter: [
        // 自定义排序规则，根据地址长度排序
        (a: any, b: any) => a.address.length - b.address.length,
        (a: any, b: any) => b.address.length - a.address.length,
      ],
    },
    {
      title: 'Email',
      key: 'Email',
      dataIndex: 'email',
      sorter: [
        // 自定义排序规则，根据邮箱前缀排序
        (a: any, b: any) =>
          a.email.split('@')[0].length - b.email.split('@')[0].length,
        (a: any, b: any) =>
          b.email.split('@')[0].length - a.email.split('@')[0].length,
      ],
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
    <Table
      sortable
      columns={columns}
      data={data}
    />
  );
};

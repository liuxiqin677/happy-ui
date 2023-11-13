import { Avatar, List } from 'happy-ui';
import React from 'react';

export default () => {
  const dataSource = new Array(1000).fill(
    {
      title: 'Virtual List',
      content: 'This is a Virtual List'
    })

  return (
    <List
      header="List title"
      dataSource={dataSource}
      renderItem={(item: any, index: number) => {
        return (
          <List.Item style={{ fontSize: '14px' }} key={item + index}>
            <div>
              <Avatar shape="square">A</Avatar>
              <div>
                <div>{item.title}</div>
                <div>{item.content}</div>
              </div>
            </div>
          </List.Item>
        );
      }}
      isVirtualList
    />
  );
}

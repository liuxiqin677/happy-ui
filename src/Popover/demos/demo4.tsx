import { Button, List, Popover } from 'happy-ui';
import React from 'react';

export default () => {
  const dataSource = [1, 2, 3, 4, 5];
  const content = (
    <List
      style={{ fontSize: '16px', width: '600px', marginTop: '30px' }}
      header="List title"
      size={'small'}
      dataSource={dataSource}
      renderItem={(item: string) => {
        return (
          <List.Item style={{ fontSize: '14px' }} key={item}>
            {item}
          </List.Item>
        );
      }}
    />
  );
  return (
    <Popover style={{
        maxWidth: '1000px'
    }} content={content} title="Title" placement='right'>
      <Button type="primary">Hover me</Button>
    </Popover>
  );
};

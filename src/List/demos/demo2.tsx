import { List, Radio, Space } from 'happy-ui';
import React, { useState } from 'react';
import { TListSize } from '../interface';

export default () => {
  const [size, setSize] = useState<TListSize>('default');
  const dataSource = [1, 2, 3, 4, 5];

  const onChange = (value: TListSize) => {
    setSize(value);
  };

  return (
    <Space direction="vertical">
      <Radio.Group
        value={size}
        options={[
          {
            label: 'large',
            value: 'large',
          },
          {
            label: 'default',
            value: 'default',
          },
          {
            label: 'small',
            value: 'small',
          },
        ]}
        onChange={onChange}
        optionType='button'
      />
      <List
        style={{ fontSize: '16px', width: '600px', marginTop: '30px' }}
        header="List title"
        size={size}
        dataSource={dataSource}
        renderItem={(item: string) => {
          return <List.Item style={{ fontSize: '14px' }} key={item}>{item}</List.Item>;
        }}
      />
    </Space>
  );
};

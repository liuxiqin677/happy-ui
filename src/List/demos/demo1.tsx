import { Avatar, List } from 'happy-ui';
import React from 'react';

export default function listDemo1() {
  const dataSource = [
    {
      title: 'Beijing Bytedance Technology Co., Ltd.',
      content:
        'Beijing ByteDance Technology Co., Ltd. is an enterprise located in China.',
    },
    {
      title: 'Beijing Bytedance Technology Co., Ltd.',
      content:
        'Beijing ByteDance Technology Co., Ltd. is an enterprise located in China.',
    },
    {
      title: 'Beijing Bytedance Technology Co., Ltd.',
      content:
        'Beijing ByteDance Technology Co., Ltd. is an enterprise located in China.',
    },
    {
      title: 'Beijing Bytedance Technology Co., Ltd.',
      content:
        'Beijing ByteDance Technology Co., Ltd. is an enterprise located in China.',
    },
    {
      title: 'Beijing Bytedance Technology Co., Ltd.',
      content:
        'Beijing ByteDance Technology Co., Ltd. is an enterprise located in China.',
    },
    {
      title: 'Beijing Bytedance Technology Co., Ltd.',
      content:
        'Beijing ByteDance Technology Co., Ltd. is an enterprise located in China.',
    },
  ];

  return (
    <List
      header={<>header</>}
      footer={<>footer</>}
      dataSource={dataSource}
      renderItem={(item: any, index: number) => {
        return (
          <List.Item style={{ fontSize: '14px' }} key={item.title + index}>
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
    />
  );
}

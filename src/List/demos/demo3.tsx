import { Avatar, List } from 'happy-ui';
import React, { useRef, useState } from 'react';

export default function listDemo1() {
  const [dataSource, setDataSource] = useState<Array<any>>([
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
  ]);
  const timeRef = useRef<NodeJS.Timeout>();

  const lazyScrollAtBottom = (
    bottomDistance: number,
    scrollToBottom: boolean,
  ) => {
    if (scrollToBottom) {
      if (timeRef.current) {
        clearTimeout(timeRef.current);
      }
      timeRef.current = setTimeout(() => {
        if (dataSource.length > 50) return;
        setDataSource((prev) => [
          ...prev,
          ...[
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
          ],
        ]);
      }, 500);
    }
  };

  return (
    <List
      header={<>header</>}
      footer={<>footer</>}
      loadMore
      dataSource={dataSource}
      renderItem={(item: any, index: number) => {
        return (
          <List.Item style={{ fontSize: '14px' }} key={item.title + index}>
            <div className="list">
              <Avatar shape="square">A</Avatar>
              <div className="text">
                <span className="title">{item.title}</span>
                <span className="content">{item.content}</span>
              </div>
            </div>
          </List.Item>
        );
      }}
      lazyScrollAtBottom={lazyScrollAtBottom}
    />
  );
}

import { Tree } from 'happy-ui';
import React from 'react';

export default () => {
  const data = [
    {
      id: '0-0',
      label: 'parent 1',
      children: [
        {
          id: '0-0-0',
          label: 'leaf 1',
        },
        {
          id: '0-0-1',
          label: 'leaf 2',
        },
      ],
    },
    {
      id: '0-1',
      label: 'parent 2',
      open: true, // parent 2 默认展开
      children: [
        {
          id: '0-1-0',
          label: 'leaf 3',
        },
        {
          id: '0-1-1',
          label: 'leaf parent 4',
          // 不会展开 leaf parent 4
          children: [
            {
              id: '0-1-1-0',
              label: 'leaf 5',
            },
          ],
        },
      ],
    },
  ];

  return <Tree data={data} />;
};

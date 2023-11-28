import { Tree } from 'happy-ui';
import React from 'react';

export default () => {
  const data = [
    {
      id: '0-0',
      label: 'parent 1',
      open: true,
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
      children: [
        {
          id: '0-1-0',
          label: 'leaf 3',
        },
        {
          id: '0-1-1',
          label: 'leaf 4',
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

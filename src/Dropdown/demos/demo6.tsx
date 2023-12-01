import { Dropdown } from 'happy-ui';
import React from 'react';

export default () => {
  const data = [
    {
      content: 'Beijing',
      icon: (
        <svg
          viewBox="64 64 896 896"
          focusable="false"
          data-icon="info-circle"
          width="1em"
          height="1em"
          fill="#1677ff"
          aria-hidden="true"
        >
          <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"></path>
        </svg>
      ),
      link: '#',
    },
    {
      content: 'Guangzhou',
      children: [
        {
          content: 'Tianhe',
          link: '#',
        },
        {
          content: 'Haizhu',
          link: '#',
          disabled: true,
        },
        {
          content: 'Yuexiu',
          link: '#',
        },
      ],
    },
    {
      content: 'Jump Google',
      link: 'https://www.google.com.hk/',
    },
  ];

  return (
    <div>
      <Dropdown placeholder="Click me" data={data} />
    </div>
  );
};
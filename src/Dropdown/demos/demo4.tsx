import { Dropdown } from 'happy-ui';
import React from 'react';

export default () => {
  const data = new Array(50)
    .fill('item')
    .map((item, index) => `${item}${index + 1}`);

  return (
    <div>
      <Dropdown placeholder="Click me" data={data} colums />
    </div>
  );
};

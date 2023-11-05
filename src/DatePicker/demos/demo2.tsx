import { DatePicker } from 'happy-ui';
import React from 'react';

export default () => {
  return (
    <DatePicker
      width={400}
      height={400}
      onChange={(date: Date) => {
        console.log(date.toLocaleDateString());
      }}
    />
  );
};

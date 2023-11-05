import { DatePicker } from 'happy-ui';
import React from 'react';

export default () => {
  return (
    <DatePicker
      value={new Date('2023-2-21')}
      onChange={(date: Date) => {
        console.log(date.toLocaleDateString());
      }}
    />
  );
};

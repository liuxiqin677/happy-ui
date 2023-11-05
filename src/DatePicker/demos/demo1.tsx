import { DatePicker } from 'happy-ui';
import React from 'react';

export default () => {
  return (
    <DatePicker
      onChange={(date: Date) => {
        console.log(date.toLocaleDateString());
      }}
    />
  );
};

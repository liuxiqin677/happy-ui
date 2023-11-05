import { DatePicker, Radio, Space } from 'happy-ui';
import React, { useState } from 'react';
import { TDisplayWeekDay } from '..';

export default () => {
  const [startWeekDay, setStartWeekDay] = useState<TDisplayWeekDay>('Sun');
  const [radioValue, setRadioValue] = useState<TDisplayWeekDay>('Sun');
  const onChange = (value: TDisplayWeekDay) => {
    setRadioValue(value);
    setStartWeekDay(value);
  };

  return (
    <Space direction="vertical" size={32}>
      <Radio.Group onChange={onChange} value={radioValue}>
        <Space>
          <Radio value={'Sun'}>Sun</Radio>
          <Radio value={'Mon'}>Mon</Radio>
          <Radio value={'Tue'}>Tue</Radio>
          <Radio value={'Wed'}>Wed</Radio>
          <Radio value={'Thu'}>Thu</Radio>
          <Radio value={'Fri'}>Fri</Radio>
          <Radio value={'Sat'}>Sat</Radio>
        </Space>
      </Radio.Group>
      <DatePicker startWeekDay={startWeekDay} />
    </Space>
  );
};

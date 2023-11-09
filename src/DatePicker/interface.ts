import { CSSProperties } from 'react';

type TDisplayWeekDay = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';

interface IDatePickerProps {
  value?: Date;
  width?: number | string;
  height?: number | string;
  style?: CSSProperties;
  className?: string;
  startWeekDay?: TDisplayWeekDay;
  onChange?: (date: Date) => void;
}

export { IDatePickerProps, TDisplayWeekDay };

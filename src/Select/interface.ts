import { CSSProperties } from 'react';

interface Options {
  label: String | number;
  value: String | number;
  disabled?: Boolean;
}

interface SelectProps {
  defaultValue?: string | number | any;
  option: Array<Options>;
  className?: string;
  style?: CSSProperties;
  width?: Number;
  placeholder?: String;
  disabled?: Boolean;
  loading?: Boolean;
  showSearch?: Boolean;
  clearable?: Boolean;
  onSelect?: Function;
  onChange?: Function;
}

export type { Options, SelectProps };

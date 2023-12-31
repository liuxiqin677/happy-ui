import { CSSProperties } from 'react';

interface Options {
  label: string | number;
  value: string | number;
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

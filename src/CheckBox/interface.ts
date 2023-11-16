import { CSSProperties, ReactNode } from 'react';

interface ICheckBoxProps {
  className?: string;
  style?: CSSProperties;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  children?: ReactNode;
}

interface ICheckBoxGroupProps {
  defaultValue?: string[] | number[];
  disabled?: boolean;
  options: string[] | number[] | Array<Option>;
  indeterminate?: boolean;
  onChange?: (checkedValue: Array<string | number>) => void;
}

interface Option {
  label: string;
  value: string;
  disabled?: boolean;
}

export { ICheckBoxGroupProps, ICheckBoxProps, Option };

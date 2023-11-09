import { CSSProperties } from 'react';
type TRadioOptions =
  | string[]
  | number[]
  | Array<{ label: React.ReactNode; value: string; disabled?: boolean }>;

interface IRadioGroupProps {
  value?: any;
  onChange?: (value: any) => void;
  name?: string;
  options?: TRadioOptions;
  disabled?: boolean;
  optionType?: 'default' | 'button';
  size?: 'large' | 'middle' | 'small';
  buttonStyle?: 'outline' | 'solid';
  className?: string;
  style?: CSSProperties;
  children?: any;
}

interface IGroupContext {
  groupValue?: any;
  groupDisabled?: boolean;
  name?: string;
  onGroupChange?: ((value: any) => void) | undefined;
}

export { IGroupContext, IRadioGroupProps, TRadioOptions };

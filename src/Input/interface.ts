import { CSSProperties, InputHTMLAttributes } from 'react';

interface InputProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'onFocus' | 'onBlur' | 'onClick' | 'onKeyDown'
  > {
  className?: string;
  style?: CSSProperties;
  width?: string | number;
  type?: 'text' | 'password' | 'num';
  disabled?: boolean;
  placeholder?: string;
  showClear?: boolean;
  showTogglePwd?: boolean;
  min?: number;
  max?: number;
  step?: number;
  maxLength?: number;
  showCount?: boolean;
  onChange?: (value: string) => void;
  onFocus?: (value: string | number) => void;
  onClick?: () => void;
  onBlur?: () => void;
  onKeyDown?: Function;
  onNumberChange?: Function;
  onClear?: Function;
  defaultValue?: string;
  value?: string;
  isFather?: boolean;
}

interface IInputRef {
  setCurrentValue: (value: string) => void;
}

export type { IInputRef, InputProps };

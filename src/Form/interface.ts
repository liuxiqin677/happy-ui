import { CSSProperties, ReactNode } from 'react';

type fieldListType = {
  rules?: Array<any>;
  val?: string;
};

type ruleType = {
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  message: string;
  fn?: Function;
};

interface IFormProps {
  style?: CSSProperties;
  className?: string;
  layout?: 'horizontal' | 'vertical';
  children: ReactNode;
  disabled?: boolean;
}

interface IFormRef {
  submit: () => any;
  resetFields: () => any;
}

export { IFormProps, IFormRef, fieldListType, ruleType };

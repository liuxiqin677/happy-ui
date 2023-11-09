import { CSSProperties, ReactNode } from 'react';

interface FromRefFunctions {
  formRef: string;
  onSubmit: Function;
  resetFields: Function;
  validateFields: Function;
  useFormContext: Function;
}

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
  formField?: any;
  disabled?: boolean;
  // useForm?: Function;
  // onSubmit?: Function;
  // resetFields?: Function;
  // validateFields?: Function;
  // useFormContext?: Function;
}

export { FromRefFunctions, IFormProps, fieldListType, ruleType };

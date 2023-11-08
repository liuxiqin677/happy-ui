import cs from 'classnames';
import React, {
  CSSProperties,
  FC,
  ReactNode,
  Ref,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Item from './Item';
import './index.less';

export const ctx = createContext<any>({} as any);

export interface FormComponent {
  Item: typeof Item;
}

export interface FromRefFunctions {
  formRef: string;
  onSubmit: Function;
  resetFields: Function;
  validateFields: Function;
  useFormContext: Function;
}

export type fieldListType = {
  rules?: Array<any>;
  val?: string;
};

const collectFormFns: FromRefFunctions = {
  formRef: '',
  onSubmit: () => {},
  resetFields: () => {},
  validateFields: () => {},
  useFormContext: () => {},
};

export type ruleType = {
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  message: string;
  fn?: Function;
};

export interface IFormProps {
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

const InternalForm: FC<IFormProps> = ({
  className,
  layout = 'horizontal',
  style,
  formField = null,
  disabled,
  children,
}) => {
  const [fieldList, setFieldList] = useState<any>({});
  const [reset, setReset] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(false);
  const depsValList = useRef<Array<string>>([]); // 所有受控控件的值
  const [formControlRef, setFormControlRef] = useState(formField);

  // 获取Form.Item中控件的值
  const getChildVal = (depVal: string) => {
    depsValList.current.push(depVal);
  };

  // 根组件状态管理，向下传入
  const providerList = {
    formControlRef,
    layout,
    reset,
    submitStatus,
    getChildVal,
  };

  const outputFormData = () => {
    // 生成表体内容
    const depsCloneList = depsValList.current;
    const returnField = JSON.parse(JSON.stringify(fieldList));
    for (const key in fieldList) {
      returnField[key].val = depsCloneList[0];
      depsCloneList.shift();
    }
    depsValList.current = [];
    return returnField;
  };

  const onSubmit = (ref: any) => {
    // 表单提交
    return new Promise((resolve) => {
      setSubmitStatus(true);
      setTimeout(async () => {
        setSubmitStatus(false);
        const result = outputFormData();
        const ruleResult = validateFields(result, ref);
        if (Object.keys(ruleResult).length > 0) {
          resolve({ ...{ submitResult: false }, ruleResult });
        }
        resolve({ ...{ submitResult: true }, result });
      });
    });
  };

  const validateFields = (resultField: any, ref: any) => {
    // 表单校验
    if (resultField === undefined) {
      resultField = outputFormData();
    }
    const resultRules: any = {};
    for (const key in resultField) {
      const field = fieldList[key];
      const value = resultField[key].val;
      if (field.rules) {
        let isPass = true;
        const rules = fieldList[key].rules;
        rules.forEach((rule: ruleType) => {
          isPass = validateRow(isPass, value, key, rule);
          const ruleDom = (ref as any).current.querySelector(
            getClassNameByKey(`${key} .show-rule-label`),
          );
          if (isPass && ruleDom) {
            ruleDom?.setAttribute('class', 'hide-rule-label');
          }
        });
      }
    }

    function getClassNameByKey(key: string) {
      return `.happy-form-item .${key}`;
    }

    function validateRow(isPass:boolean, value: any, key: any , rule: ruleType) {
      if (rule.required && value === '' && isPass) {
        // 必填校验
        isPass = false;
        changeValidateText(getClassNameByKey(key), rule.message, key, ref);
      } else if (
        (rule.maxLength && value.length > rule.maxLength && isPass) ||
        (rule.minLength && value.length < rule.minLength && isPass) 
      ) {
        // 最长字段校验
        isPass = false;
        changeValidateText(getClassNameByKey(key), rule.message, key, ref);
      } else if ( rule.fn && !rule.fn(value) && isPass) {
        // 自定义校验函数
        isPass = false;
        changeValidateText(getClassNameByKey(key), rule.message, key, ref);
      }
      return isPass;
    }

    function changeValidateText(
      className: string,
      text: string,
      field: string,
      ref: any,
    ) {
      resultRules[field] = text;
      const hideDom = (ref as any).current.querySelector(
        `${className} .hide-rule-label`,
      ) as HTMLElement;
      const showDom = (ref as any).current.querySelector(
        `${className} .show-rule-label`,
      ) as HTMLElement;
      if (hideDom && hideDom?.innerText) {
        hideDom.innerText = text;
      } else if (showDom && showDom?.innerText) {
        showDom.innerText = text;
      }
      hideDom?.setAttribute('class', 'show-rule-label');
    }
    return resultRules;
  };

  const resetFields = useCallback(
    (ref: any) => {
      // 重置表单
      setFormControlRef(ref);
      setReset(true);
      setTimeout(() => {
        setReset(false);
      });
    },
    [formControlRef],
  );

  const useFormContext = () => {
    // 表单提交
    return new Promise((resolve) => {
      setSubmitStatus(true);
      setTimeout(async () => {
        setSubmitStatus(false);
        const result = outputFormData();
        resolve(result);
      });
    });
  };

  const formClass = useMemo(() => {
    return cs({
      'happy-form': true,
      className,
    });
  }, []);

  useEffect(() => {
    if (formField) {
      const fieldL: any = {};
      React.Children.toArray(children).forEach((child: any) => {
        if (child.props.field) {
          const key = child.props.field;
          fieldL[key] = {
            rules: child.props.rules || null,
            val: '',
          };
        }
      });
      setFieldList(fieldL);
    }
  }, []);

  useEffect(() => {
    if (formField) {
      collectFormFns.onSubmit = onSubmit;
      collectFormFns.resetFields = resetFields;
      collectFormFns.validateFields = validateFields;
      collectFormFns.useFormContext = useFormContext;
      collectFormFns.formRef = formField;
    }
  }, [fieldList, formField]);

  return (
    <ctx.Provider value={providerList}>
      <div className={formClass} style={style} ref={formField || null}>
        {disabled && <div className="happy-form-disabled" />}
        {children}
      </div>
    </ctx.Provider>
  );
};

type CompoundedComponent = React.ForwardRefExoticComponent<IFormProps> & {
  Item: typeof Item;
  useForm: Function;
};

const Form = InternalForm as CompoundedComponent;
Form.Item = Item;
Form.useForm = () => {
  return collectFormFns;
};

export default Form;

import React, {
  createContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import Item from './Item';
import './index.less';
import { IFormProps, IFormRef, ruleType } from './interface';

export const ctx = createContext<any>({} as any);

const InternalForm = React.forwardRef<IFormRef, IFormProps>(
  (
    { children, className = '', layout = 'horizontal', style, disabled },
    ref,
  ) => {
    const [fieldList, setFieldList] = useState<any>({});
    const [reset, setReset] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(false);
    const depsValList = useRef<Array<string>>([]); // 所有受控控件的值
    const internalFormRef = useRef<any>();

    // 获取Form.Item中控件的值
    const getChildVal = (depVal: string) => {
      depsValList.current.push(depVal);
    };

    // 根组件状态管理，向下传入
    const providerList = {
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

    const onSubmit = () => {
      // 表单提交
      return new Promise((resolve) => {
        setSubmitStatus(true);
        setTimeout(async () => {
          setSubmitStatus(false);
          const result = outputFormData();

          const ruleResult = validateFields(result);
          if (Object.keys(ruleResult).length > 0) {
            resolve({ ...{ submitResult: false }, ruleResult });
          }
          resolve({ ...{ submitResult: true }, result });
        });
      });
    };

    const validateFields = (resultField: any) => {
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
            const ruleDom = (internalFormRef as any).current.querySelector(
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

      function validateRow(
        isPass: boolean,
        value: any,
        key: any,
        rule: ruleType,
      ) {
        if (rule.required && value === '' && isPass) {
          // 必填校验
          isPass = false;
          changeValidateText(getClassNameByKey(key), rule.message, key);
        } else if (
          (rule.maxLength && value.length > rule.maxLength && isPass) ||
          (rule.minLength && value.length < rule.minLength && isPass)
        ) {
          // 最长字段校验
          isPass = false;
          changeValidateText(getClassNameByKey(key), rule.message, key);
        } else if (rule.fn && !rule.fn(value) && isPass) {
          // 自定义校验函数
          isPass = false;
          changeValidateText(getClassNameByKey(key), rule.message, key);
        }
        return isPass;
      }

      function changeValidateText(
        className: string,
        text: string,
        field: string,
      ) {
        resultRules[field] = text;
        const hideDom = (internalFormRef as any).current.querySelector(
          `${className} .hide-rule-label`,
        ) as HTMLElement;
        const showDom = (internalFormRef as any).current.querySelector(
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

    const resetFields = () => {
      // 重置表单
      setReset(true);
      setTimeout(() => {
        setReset(false);
      });
    };

    useEffect(() => {
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
    }, []);

    useImperativeHandle(ref, () => ({
      submit: () => onSubmit(),
      resetFields: () => resetFields(),
    }));

    return (
      <ctx.Provider value={providerList}>
        <div
          className={`happy-form ${className}`}
          style={style}
          ref={internalFormRef}
        >
          {disabled && <div className="happy-form-disabled" />}
          {children}
        </div>
      </ctx.Provider>
    );
  },
);

type CompoundedComponent = React.ForwardRefExoticComponent<IFormProps> & {
  Item: typeof Item;
};

const Form = InternalForm as CompoundedComponent;
Form.Item = Item;

export default Form;

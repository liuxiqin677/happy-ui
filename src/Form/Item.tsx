import cs from 'classnames';
import React, {
  CSSProperties,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import RequiredIcon from '../../components/RequiredIcon';
import FormItemAttrs from './FormItemAttrs';
import FormItemLabel from './FormItemLabel';
import { ctx } from './index';
import './index.less';
import { ruleType } from './interface';

export interface IFormItemProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  label?: string;
  wrapperCol?: number;
  wrapperTol?: number;
  field?: string;
  rules?: Array<ruleType>;
  disabled?: boolean;
}

const FormItem = (props: IFormItemProps) => {
  const {
    children,
    className,
    style = {},
    label,
    wrapperCol = 0,
    wrapperTol = 0,
    field,
    rules = [],
    disabled = false,
  } = props;

  const [propsStyle, setPropsStyle] = useState({});
  const [labelStyle, setLabelStyle] = useState({});

  const classFirstName = 'happy-form-item';

  const Ctx = (function () {
    // 创建一个ctx单例，防止组件内污染全局变量
    const c = useContext(ctx);
    return {
      get: (prop: string) => {
        return c[prop] || null;
      },
    };
  })();

  const getPropsStyles = useCallback(() => {
    // 基于props，动态构建一个props style集合
    const formAttrs = new FormItemAttrs(
      wrapperCol,
      wrapperTol,
      Ctx.get('layout'),
    );
    return formAttrs.getStyle();
  }, [wrapperCol, wrapperTol, Ctx.get('layout')]);

  const getLabelPropsStyle = useCallback(() => {
    // 基于props，动态构建一个label props style集合
    const labelAttrs = new FormItemLabel(Ctx.get('layout'));
    return labelAttrs.getStyle();
  }, [Ctx.get('layout')]);

  const formItemClass = useMemo(() => {
    return cs(className, classFirstName);
  }, [className]);

  useEffect(() => {
    setPropsStyle({ ...getPropsStyles(), ...style });
    setLabelStyle(getLabelPropsStyle());
  }, [props]);

  return (
    <div className={formItemClass} style={propsStyle}>
      <div className={`${classFirstName}-label`} style={labelStyle}>
        {rules.length > 0 && <RequiredIcon />}
        {label || ''}
      </div>
      <div
        className={field || `${classFirstName}-content`}
        style={
          Ctx.get('layout') === 'horizontal' ? { position: 'relative' } : {}
        }
      >
        {children}
        {disabled && <div className={`${classFirstName}-disabled`} />}
        {field && rules.length > 0 && (
          <div className="hide-rule-label">{rules[0].message}</div>
        )}
      </div>
    </div>
  );
};

export default FormItem;

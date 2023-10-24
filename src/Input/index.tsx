/*
 * @Author: liuxiqin
 * @Date: 2023-10-09 16:03:46
 * @LastEditTime: 2023-10-24 16:36:38
 * @LastEditors: liuxiqin
 * @Description:
 */
import cs from 'classnames';
import React, { CSSProperties, FC, ReactNode, useMemo, useState } from 'react';
import './index.less';

export type InputSize = 'large' | 'middle' | 'small';

export type Type = 'input' | 'textarea' | 'password';

export interface IProps {
  type?: Type;
  addonAfter?: ReactNode | string;
  addonBefore?: ReactNode | string;
  placeholder?: string;
  bordered?: boolean;
  disabled?: boolean;
  id?: string;
  maxLength?: number;
  showCount?: boolean;
  styles?: CSSProperties;
  className?: string;
  size?: InputSize;
  value?: string;
  onChange?: (value: string) => void;
  cols?: number;
  rows?: number;
  resizeable?: boolean;
}

interface InternalInputProps extends IProps {
  inputClassNames: string;
  setCurrentCount: (value: number) => void;
}

type TextAreaType = Pick<
  IProps,
  | 'bordered'
  | 'disabled'
  | 'className'
  | 'styles'
  | 'value'
  | 'maxLength'
  | 'placeholder'
  | 'onChange'
  | 'cols'
  | 'rows'
  | 'resizeable'
>;

export interface ITextAreaProps extends TextAreaType {
  setCurrentCount?: (value: number) => void;
}

const InputComponent = React.memo(
  ({
    id,
    disabled,
    className,
    inputClassNames,
    styles,
    placeholder,
    value,
    maxLength,
    setCurrentCount,
    onChange,
  }: InternalInputProps) => {
    const [currentValue, setCurrentValue] = useState<string>('');
    return (
      <input
        id={id}
        disabled={disabled}
        type="text"
        className={`${inputClassNames} ${className ? className : ''}`}
        style={styles}
        placeholder={placeholder}
        value={value || currentValue}
        onChange={(e) => {
          if (maxLength !== undefined && e.target.value.length > maxLength) {
            return;
          }
          setCurrentValue(e.target.value);
          setCurrentCount(e.target.value.length);
          onChange?.(e.target.value);
        }}
      />
    );
  },
);

const TextAreaComponent = React.memo(
  ({
    bordered,
    disabled,
    className,
    styles,
    value,
    maxLength,
    placeholder,
    cols,
    rows = 4,
    onChange,
    setCurrentCount,
    resizeable,
  }: ITextAreaProps) => {
    const [currentValue, setCurrentValue] = useState<string>('');

    const textAreaClassNames = useMemo(() => {
      return cs({
        'happy-textArea': true,
        'happy-textArea-no-borderd': !bordered,
        'happy-textArea-disabled': disabled,
      });
    }, [disabled, bordered]);

    return (
      <>
        <textarea
          style={{
            ...(!resizeable ? { resize: 'none' } : {}),
            ...styles,
          }}
          className={`${textAreaClassNames} ${className ? className : ''}`}
          placeholder={placeholder}
          rows={rows}
          cols={cols}
          value={value || currentValue}
          onChange={(e) => {
            if (maxLength !== undefined && e.target.value.length > maxLength) {
              return;
            }
            setCurrentCount?.(e.target.value.length);
            setCurrentValue(e.target.value);
            onChange?.(e.target.value);
          }}
        ></textarea>
      </>
    );
  },
);

const Input: FC<IProps> = ({
  type = 'input',
  addonAfter,
  addonBefore,
  placeholder,
  bordered = true,
  disabled = false,
  id,
  maxLength,
  showCount,
  styles,
  className,
  size = 'middle',
  value,
  onChange,
  cols,
  rows = 4,
  resizeable = true,
}) => {
  const [currentCount, setCurrentCount] = useState<number>(0);

  const inputClassNames = useMemo(() => {
    return cs({
      'happy-input': true,
      'happy-input-lg': size === 'large',
      'happy-input-sm': size === 'small',
      'happy-input-no-bordered': !bordered,
      'happy-input-disabled': disabled,
    });
  }, [disabled, bordered]);

  const inputWrapperClassName = useMemo(() => {
    return cs({
      'happy-input-group': addonAfter || addonBefore,
      'happy-input-affix-wrapper': showCount,
    });
  }, [showCount, addonAfter, addonBefore]);

  return (
    <>
      {type === 'input' && (
        <div className={inputWrapperClassName}>
          {typeof addonBefore === 'string' ? (
            <span className="happy-input-group-addon">{addonBefore}</span>
          ) : (
            addonBefore
          )}
          {showCount ? (
            <div className="happy-input-affix-group">
              <InputComponent
                id={id}
                disabled={disabled}
                className={className}
                inputClassNames={inputClassNames}
                styles={styles}
                placeholder={placeholder}
                value={value}
                maxLength={maxLength}
                setCurrentCount={(value: number) => setCurrentCount(value)}
                onChange={(value: string) => onChange?.(value)}
              />
              <span className="happy-input-suffix">
                {currentCount}
                {maxLength ? `/${maxLength}` : ''}
              </span>
            </div>
          ) : (
            <InputComponent
              id={id}
              disabled={disabled}
              className={className}
              inputClassNames={inputClassNames}
              styles={styles}
              placeholder={placeholder}
              value={value}
              maxLength={maxLength}
              setCurrentCount={(value: number) => setCurrentCount(value)}
              onChange={(value: string) => onChange?.(value)}
            />
          )}
          {typeof addonAfter === 'string' ? (
            <span className="happy-input-group-addon">{addonAfter}</span>
          ) : (
            addonAfter
          )}
        </div>
      )}
      {type === 'textarea' && (
        <div className="happy-textArea-group">
          {showCount ? (
            <div className="happy-textArea-group">
              <TextAreaComponent
                maxLength={maxLength}
                styles={styles}
                className={className}
                value={value}
                bordered={bordered}
                setCurrentCount={(value: number) => setCurrentCount(value)}
                onChange={onChange}
                cols={cols}
                rows={rows}
                resizeable={resizeable}
              />
              <span className="happy-textArea-suffix">
                {currentCount}
                {maxLength ? `/${maxLength}` : ''}
              </span>
            </div>
          ) : (
            <TextAreaComponent
              maxLength={maxLength}
              styles={styles}
              className={className}
              value={value}
              bordered={bordered}
              onChange={onChange}
              cols={cols}
              rows={rows}
              resizeable={resizeable}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Input;

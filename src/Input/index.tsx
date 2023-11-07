import cs from 'classnames';
import { ctx } from 'happy-ui/Form';
import React, {
  CSSProperties,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import './index.less';

export type InputSize = 'large' | 'middle' | 'small';

export type Type = 'input' | 'textarea' | 'password';

export interface IProps {
  width?: number;
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
interface InternalInputRef {
  getValue: () => any;
  reset: () => void;
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

const InputComponent = React.forwardRef<InternalInputRef, InternalInputProps>(
  (
    {
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
    },
    ref,
  ) => {
    const [currentValue, setCurrentValue] = useState<string>('');

    useImperativeHandle(ref, () => ({
      getValue: () => currentValue,
      reset: () => setCurrentValue(''),
    }));

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

const TextAreaComponent = React.forwardRef<InternalInputRef, ITextAreaProps>(
  (
    {
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
    },
    ref,
  ) => {
    const [currentValue, setCurrentValue] = useState<string>('');
    useImperativeHandle(ref, () => ({
      getValue: () => currentValue,
      reset: () => setCurrentValue(''),
    }));

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
  width,
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
  const formCtx: any = useContext(ctx);
  const [currentCount, setCurrentCount] = useState<number>(0);
  const inputRef = useRef<InternalInputRef>(null);

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

  // 监听 form 组件的重置操作
  useEffect(() => {
    if (formCtx.reset) {
      inputRef.current?.reset();
    }
  }, [formCtx.reset]);

  // 监听 form 组件的 onSubmit 操作
  useEffect(() => {
    if (formCtx.submitStatus) {
      formCtx.getChildVal(inputRef.current?.getValue());
    }
  }, [formCtx.submitStatus]);

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
                ref={inputRef}
                id={id}
                disabled={disabled}
                className={className}
                inputClassNames={inputClassNames}
                styles={{
                  ...(width ? { width: `${width}px` } : {}),
                  ...styles,
                }}
                placeholder={placeholder}
                value={value}
                maxLength={maxLength}
                setCurrentCount={(value: number) => setCurrentCount(value)}
                onChange={(value: string) => {
                  onChange?.(value);
                }}
              />
              <span className="happy-input-suffix">
                {currentCount}
                {maxLength ? `/${maxLength}` : ''}
              </span>
            </div>
          ) : (
            <InputComponent
              ref={inputRef}
              id={id}
              disabled={disabled}
              className={className}
              inputClassNames={inputClassNames}
              styles={{
                ...(width ? { width: `${width}px` } : {}),
                ...styles,
              }}
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
                ref={inputRef}
                maxLength={maxLength}
                styles={{
                  ...(width ? { width: `${width}px` } : {}),
                  ...styles,
                }}
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
              ref={inputRef}
              maxLength={maxLength}
              styles={{
                ...(width ? { width: `${width}px` } : {}),
                ...styles,
              }}
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

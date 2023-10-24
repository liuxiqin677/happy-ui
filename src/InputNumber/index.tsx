/*
 * @Author: liuxiqin
 * @Date: 2023-10-11 10:45:03
 * @LastEditTime: 2023-10-11 16:59:49
 * @LastEditors: liuxiqin
 * @Description:
 */
import cs from 'classnames';
import { parseFloatPrecision } from 'happy-ui/utils';
import React, {
  CSSProperties,
  FC,
  ReactNode,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import './index.less';

export type InputSize = 'large' | 'middle' | 'small';

type THandleType = 'up' | 'down';

type TEventHandleType = 'upAndDown' | 'click';

export interface IProps {
  addonAfter?: ReactNode | string;
  addonBefore?: ReactNode | string;
  controls?: boolean;
  placeholder?: string;
  defaultValue?: number;
  bordered?: boolean;
  disabled?: boolean;
  max?: number;
  min?: number;
  prefix?: string | ReactNode;
  styles?: CSSProperties;
  className?: string;
  size?: InputSize;
  step?: number;
  value?: number;
  precision?: number;
  onChange?: (value: string | number | undefined) => void;
  onPressEnter?: (value: number | string) => void;
  onStep?: (
    value: number,
    info: { offset: number; type: 'up' | 'down' },
  ) => void;
}

const InputNumber: FC<IProps> = ({
  addonAfter,
  addonBefore,
  defaultValue,
  controls = true,
  max = Number.MAX_SAFE_INTEGER,
  min = Number.MIN_SAFE_INTEGER,
  prefix,
  precision = 2,
  placeholder,
  bordered = true,
  disabled = false,
  styles,
  className,
  size = 'middle',
  value,
  step = 1,
  onChange,
  onPressEnter,
  onStep,
}) => {
  const [currentValue, setCurrentValue] = useState<number | string | undefined>(
    value || defaultValue || undefined,
  );
  // 记录上一次的合法值
  const preValue = useRef(value || defaultValue || undefined);

  const inputClassNames = useMemo(() => {
    return cs({
      'happy-input-number': true,
      'happy-input-number-lg': size === 'large',
      'happy-input-number-sm': size === 'small',
      'happy-input-number-no-bordered': !bordered,
      'happy-input-number-disabled': disabled,
    });
  }, [disabled, bordered]);

  const inputWrapperClassName = useMemo(() => {
    return cs({
      'happy-input-number-group-wrapper': true,
    });
  }, []);

  // 检验当前输入的值是否合法
  const verifyBeforeSubmit = useCallback(
    (
      inputValue: number | string | undefined,
      callback?: (value: any) => any,
    ) => {
      const NUM_PATTERN = /^-?[1-9]*(\.\d*)?$|^-?0(\.\d*)?$/;
      // 校验 inputValue 是否合法，如果不合法，则需回滚到上一次的值，也就是 preValue.current
      if (
        !inputValue ||
        String(inputValue).length === 0 ||
        !NUM_PATTERN.test(String(inputValue)) ||
        (typeof min === 'number' && Number(inputValue) < min) || // 越界
        (typeof max === 'number' && Number(inputValue) > max) // 越界
      ) {
        setCurrentValue(preValue.current || defaultValue);
        return;
      }

      // 如果合法，则去做进一步的处理
      let commitVal = parseFloat(String(inputValue)).toFixed(precision);

      // step2 保留两位小数点
      if (
        typeof min === 'number' &&
        typeof max === 'number' &&
        parseFloat(String(inputValue)) > min &&
        parseFloat(String(inputValue)) < max
      ) {
        commitVal = parseFloat(String(inputValue)).toFixed(precision);
      } else {
        if (typeof min === 'number' && parseFloat(String(inputValue)) <= min) {
          commitVal = String(min);
        } else if (
          typeof max === 'number' &&
          parseFloat(String(inputValue)) >= max
        ) {
          commitVal = String(max);
        }
      }

      // 记录最新的合法的值
      preValue.current = Number(commitVal);
      // 设置值
      setCurrentValue(Number(commitVal));
      // 执行回调
      callback?.(commitVal);
      // onChange?.(commitVal);
    },
    [currentValue, min, max, value],
  );

  // 回车回调
  const handlePressEnter = useCallback(() => {
    verifyBeforeSubmit(currentValue, onPressEnter);
  }, [verifyBeforeSubmit, onPressEnter]);

  // 按上下箭头进行加减、或者点击加减按钮进行加减时的回调
  const handleStep = useCallback(
    (type: THandleType, eventType: TEventHandleType) => {
      if (eventType === 'upAndDown' && !onStep) return;

      // 计算 nextVal
      const nextVal =
        type === 'up'
          ? Number(currentValue) + step
          : Number(currentValue) - step;
      let finalVal: string | number = parseFloat(String(nextVal)).toFixed(
        precision,
      );

      // 计算 finalVal
      if (
        typeof min === 'number' &&
        typeof max === 'number' &&
        parseFloat(String(nextVal)) > min &&
        parseFloat(String(nextVal)) < max
      ) {
        if (type === 'up') {
          finalVal = parseFloatPrecision(nextVal);
        } else {
          finalVal = parseFloatPrecision(nextVal);
        }
      } else {
        if (typeof min === 'number' && parseFloat(String(nextVal)) <= min) {
          finalVal = String(min);
        } else if (
          typeof max === 'number' &&
          parseFloat(String(nextVal)) >= max
        ) {
          finalVal = String(max);
        }
      }

      // 记录新的值
      preValue.current = Number(finalVal);
      setCurrentValue(Number(finalVal));

      // 执行回调
      if (eventType === 'upAndDown') {
        onStep?.(Number(finalVal), { offset: currentValue as number, type });
      }
      onChange?.(Number(finalVal));
    },
    [onStep, currentValue, min, max, precision],
  );

  // 键盘事件回调
  const handleKeyDown = useCallback(
    (e: any) => {
      const { key } = e;
      switch (key) {
        case 'Enter':
          handlePressEnter();
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (e.shiftKey) {
            handleStep('up', 'upAndDown');
          } else {
            handleStep('up', 'upAndDown');
          }
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (e.shiftKey) {
            handleStep('down', 'upAndDown');
          } else {
            handleStep('down', 'upAndDown');
          }
          break;
        default:
          break;
      }
    },
    [handlePressEnter],
  );

  return (
    <div className={inputWrapperClassName}>
      {typeof addonBefore === 'string' ? (
        <div className="happy-input-number-group-addon">{addonBefore}</div>
      ) : (
        addonBefore
      )}
      <div className="happy-input-number-wrapper">
        {controls && !disabled && (
          <div className="happy-input-number-handler-wrap">
            <div className="up" onClick={() => handleStep('up', 'click')}>
              +
            </div>
            <div className="down" onClick={() => handleStep('down', 'click')}>
              -
            </div>
          </div>
        )}
        <div className="happy-input-number-input-wrapper">
          {prefix ? (
            typeof prefix === 'string' ? (
              <span className="happy-input-number-prefix">{prefix}</span>
            ) : (
              prefix
            )
          ) : (
            <></>
          )}
          <input
            aria-valuemax={max}
            aria-valuemin={min}
            disabled={disabled}
            type="text"
            className={`${inputClassNames} ${className ? className : ''}`}
            style={styles}
            placeholder={placeholder}
            // defaultValue={defaultValue}
            value={value || currentValue}
            onChange={(e) => {
              setCurrentValue(e.target.value);
            }}
            onBlur={(e) => {
              verifyBeforeSubmit(e.target.value, onChange);
            }}
            onKeyDown={(e) => handleKeyDown(e)}
          />
        </div>
      </div>
      {typeof addonAfter === 'string' ? (
        <div className="happy-input-number-group-addon">{addonAfter}</div>
      ) : (
        addonAfter
      )}
    </div>
  );
};

export default InputNumber;

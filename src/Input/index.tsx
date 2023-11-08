import cs from 'classnames';
import React, { FC, useContext, useEffect, useMemo, useState } from 'react';
import ClearIcon from '../../components/ClearIcon';
import DownOutlined from '../../components/DownOutlined';
import EyeOutlined from '../../components/EyeOutlined';
import UpOutlined from '../../components/UpOutlined';
import { ctx } from '../Form';
import './index.less';
import { InputProps } from './interface';

const Input: FC<InputProps> = ({
  className,
  style,
  width = 200,
  type,
  disabled = false,
  placeholder,
  showClear,
  showTogglePwd,
  min,
  max,
  step,
  onChange,
  onKeyDown,
  onFocus,
  onClick,
  onBlur,
  onNumberChange,
  onClear,
  defaultValue,
  value
}) => {
  const [iptValue, setIptValue] = useState<string | number>(
    defaultValue || value || '',
  );
  const [pwdIptState, setPwdIptState] = useState(true); // 密码框切换状态

  const classNames = useMemo(() => {
    return cs({
      'happy-input': true,
      'happy-input-disabled': disabled,
      className
    })
  }, [disabled]);

  const formCtx: any = useContext(ctx);

  const changeIpt = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIptValue(e.target.value);
    onChange?.(e.target.value);
  }

  // 失去焦点
  const blurIpt = () => {
    if (type === 'num') {
      const val = Number(iptValue);
      if (isNaN(val)) {
        setIptValue('');
        onChange?.('');
      } else {
        const num = getNum(val);
        if (val !== num) {
          setIptValue(num);
          onChange?.(String(num));
        }
      }
    }
    onBlur?.();
  };

  // 焦点
  const focusIpt = () => {
    onFocus?.(iptValue);
  };

  // 点击回调
  const iptHandleClick = () => {
    onClick?.();
  };

  // 加
  const addNum = () => {
    // 加
    if (type === 'num' && isNaN(Number(iptValue))) {
      return setIptValue('');
    }
    const stepNum = step || 1;
    const res = getNum(Number(iptValue) + stepNum);
    onNumberChange?.(res);
    setIptValue(res);
  };

  // 减
  const lowNum = () => {
    // 减
    if (type === 'num' && isNaN(Number(iptValue))) {
      return setIptValue('');
    }
    const stepNum = step || 1;
    const res = getNum(Number(iptValue) - stepNum);
    onNumberChange?.(res);
    setIptValue(res);
  };

  // 获取数字框范围内的值
  const getNum = (num: number) => {
    if (step && typeof max === 'number' && num > max) {
      return max;
    }
    if (step && typeof min === 'number' && num < min) {
      return min;
    }
    return num;
  };

  // input类型
  const iptType = useMemo(() => {
    if (showTogglePwd && type === 'password') {
      return pwdIptState ? 'password' : 'text';
    }
    return type || 'text';
  }, [type, showTogglePwd, pwdIptState]);

  // 监听Form组件的重置操作
  useEffect(() => {
    if (formCtx.reset) {
      setIptValue('');
    }
  }, [formCtx.reset]);

  // 监听Form 获取值
  useEffect(() => {
    if (formCtx.submitStatus) {
      formCtx.getChildVal(iptValue);
    }
  }, [formCtx.submitStatus]);

  return (
    <div
      className={classNames}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        ...style,
      }}
    >
      <input
        disabled={disabled}
        className="input"
        type={iptType}
        placeholder={placeholder}
        value={defaultValue || iptValue}
        onChange={(e) => changeIpt(e)}
        onBlur={() => blurIpt()}
        onFocus={() => focusIpt()}
        onKeyUp={(e) => onKeyDown?.(e)}
        onClick={() => iptHandleClick()}
      />
      {
        // 可清除
        (showClear && String(iptValue).length && (
          <span
            className="clear-svg input-clear"
            onClick={(e) => {
              e.stopPropagation();
              setIptValue('');
              onClear && onClear();
            }}
          >
            <ClearIcon />
          </span>
        )) ||
          // 密码框
          (type === 'password' && showTogglePwd && (
            <div
              style={{
                position: 'absolute',
                right: '5px',
                fontSize: '12px',
                cursor: 'pointer',
              }}
              onClick={() => setPwdIptState(!pwdIptState)}
            >
              <EyeOutlined />
            </div>
          )) ||
          // 数字框
          (type === 'num' && (
            <div className="numTags">
              <div
                style={{ cursor: 'pointer', fontSize: '10px' }}
                onClick={addNum}
              >
                <UpOutlined />
              </div>
              <div
                style={{ cursor: 'pointer', fontSize: '10px' }}
                onClick={lowNum}
              >
                <DownOutlined />
              </div>
            </div>
          ))
      }
    </div>
  );
};

export default Input;

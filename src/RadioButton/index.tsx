import cs from 'classnames';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { GroupContext } from '../RadioGroup/index';
import './index.less';
import { IRadioButtonProps } from './interface';

const RadioButton: React.FC<IRadioButtonProps> = ({
  disabled = false,
  value,
  checked = false,
  defaultChecked = false,
  children,
}) => {
  const { groupValue, groupDisabled, name, onGroupChange } =
    useContext(GroupContext);
  const [check, setCheck] = useState<boolean>();

  const labelClass = useMemo(() => {
    return cs({
      'happy-radio-button-wrapper': true,
      'happy-radio-button-wrapper-checked': check,
      'happy-radio-button-wrapper-disabled': groupDisabled || disabled,
    });
  }, [disabled, check]);

  const spanClass = useMemo(() => {
    return cs({
      'happy-radio-button': true,
      'happy-radio-button-checked': check,
      'happy-radio-button-disabled': groupDisabled || disabled,
    });
  }, [disabled, check]);

  // 是否 check，由 radioGroup 最新的 groupValue 来判断
  useEffect(() => {
    if (groupValue) {
      setCheck(groupValue === value);
    } else {
      setCheck(defaultChecked || checked);
    }
  }, [checked, groupValue, value]);

  return (
    <label className={labelClass}>
      <span className={spanClass}>
        <input
          name={name}
          type="radio"
          value={value || ''}
          disabled={groupDisabled || disabled}
          className="happy-radio-button-input"
          checked={check}
          onChange={(e) => {
            if (groupValue) {
              // 如果配合 radioGroup 使用，则把当前值传回去，然后会改变 radioGroup 的 value，value 一遍，就会重新判断是否选中
              onGroupChange?.(value ?? groupValue);
            } else {
              // 如果只是单独使用 radio，直接设置内部的选中状态即可
              setCheck(e.target.checked);
            }
          }}
        />
        <span className="happy-radio-inner"></span>
      </span>
      <span>{children}</span>
    </label>
  );
};

export default RadioButton;

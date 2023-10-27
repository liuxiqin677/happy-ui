import cs from 'classnames';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import RadioButton from '../RadioButton/index';
import RadioGroup, { GroupContext } from '../RadioGroup/index';
import './index.less';

export interface IRadioProps {
  disabled?: boolean;
  value?: any;
  checked?: boolean;
  defaultChecked?: boolean;
  children?: any;
}

const InternalRadio: React.FC<IRadioProps> = ({
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
      'happy-radio-wrapper': true,
      'happy-radio-wrapper-disabled': groupDisabled || disabled,
      'happy-radio-wrapper-checked': check,
    });
  }, [disabled, check]);

  const spanClass = useMemo(() => {
    return cs({
      'happy-radio': true,
      'happy-radio-checked': check,
      'happy-radio-disabled': groupDisabled || disabled,
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
          value={value}
          disabled={groupDisabled || disabled}
          className="happy-radio-input"
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

type CompoundedComponent = React.ForwardRefExoticComponent<IRadioProps> & {
  Button: typeof RadioButton;
  Group: typeof RadioGroup;
};

const Radio = InternalRadio as CompoundedComponent;

Radio.Group = RadioGroup;

Radio.Button = RadioButton;

export default Radio;

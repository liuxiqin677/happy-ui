/*
 * @Author: liuxiqin
 * @Date: 2023-10-12 14:49:27
 * @LastEditTime: 2023-10-20 14:37:39
 * @LastEditors: liuxiqin
 * @Description:
 */
import cs from 'classnames';
import Radio from 'happy-ui/Radio';
import RadioButton from 'happy-ui/RadioButton';
import React, { createContext, CSSProperties, useMemo } from 'react';
import './index.less';

export type TRadioOptions =
  | string[]
  | number[]
  | Array<{ label: React.ReactNode; value: string; disabled?: boolean }>;

export interface IRadioGroupProps {
  value?: any;
  onChange?: (value: any) => void;
  name?: string;
  options?: TRadioOptions;
  disabled?: boolean;
  optionType?: 'default' | 'button';
  size?: 'large' | 'middle' | 'small';
  buttonStyle: 'outline' | 'solid';
  className?: string;
  style?: CSSProperties;
  children?: any;
}

export interface IGroupContext {
  groupValue?: any;
  groupDisabled?: boolean;
  name?: string;
  onGroupChange?: ((value: any) => void) | undefined;
}

export const GroupContext = createContext<IGroupContext>({
  groupValue: undefined,
  groupDisabled: false,
  name: undefined,
  onGroupChange: () => {},
});

const RadioGroup: React.FC<IRadioGroupProps> = ({
  value,
  onChange,
  name,
  options,
  optionType = 'default',
  disabled = false,
  size = 'middle',
  buttonStyle = 'outline',
  className = '',
  style = {},
  children,
}) => {
  const classNames = useMemo(() => {
    return cs({
      'happy-radio-group': true,
      'happy-radio-group-large': size === 'large',
      'happy-radio-group-small': size === 'small',
      'happy-radio-group-outline': buttonStyle === 'outline',
      'happy-radio-group-solid': buttonStyle === 'solid',
    });
  }, []);

  const groupContext = useMemo(() => {
    return {
      groupValue: value,
      groupDisabled: disabled,
      name,
      onGroupChange: onChange,
    };
  }, [value, onChange]);

  return (
    <div className={`${classNames} ${className}`} style={style}>
      <GroupContext.Provider value={groupContext}>
        {options ? (
          options.map((item: any) =>
            optionType === 'default' ? (
              <Radio
                key={item?.value ? item?.value : item}
                value={item?.value ? item?.value : item}
                disabled={item?.disabled ? true : false}
              >
                {item?.label ? item?.label : item}
              </Radio>
            ) : (
              <RadioButton
                key={item?.value ? item?.value : item}
                value={item?.value ? item?.value : item}
                disabled={item?.disabled ? true : false}
              >
                {item?.label ? item?.label : item}
              </RadioButton>
            ),
          )
        ) : children ? (
          children
        ) : (
          <></>
        )}
      </GroupContext.Provider>
    </div>
  );
};

export default RadioGroup;

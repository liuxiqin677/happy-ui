import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import CheckBox from './index';
import './index.less';
import { ICheckBoxGroupProps, Option } from './interface';

const CheckBoxGroup: FC<ICheckBoxGroupProps> = ({
  defaultValue,
  disabled = false,
  options,
  indeterminate = false,
  onChange,
}) => {
  const [checkedValues, setCheckedValues] = useState<Array<number | string>>(
    defaultValue ? [...defaultValue] : [],
  );
  const initDefault = useRef<boolean>(false);
  const hasCheckAll = useRef<boolean>(false);

  const getItemValue = (item: string | number | Option) => {
    return typeof item === 'string' || typeof item === 'number'
      ? item
      : item.label;
  };

  const isChecked = (item: string | number | Option) => {
    return checkedValues.includes(getItemValue(item));
  };

  const isDisabled = (item: string | number | Option) => {
    return disabled || typeof item === 'string' || typeof item === 'number'
      ? disabled
      : item.disabled;
  };

  const changeHanlder = (checked: boolean, currentValue: string | number) => {
    if (checked) {
      setCheckedValues([...checkedValues, currentValue]);
      onChange?.([...checkedValues, currentValue]);
    } else {
      const res = checkedValues.filter(
        (item: string | number | Option) => getItemValue(item) !== currentValue,
      );
      setCheckedValues([...res]);
      onChange?.([...res]);
    }
  };

  const renderOptions = useMemo(() => {
    return options && options.length
      ? options.map((item: string | number | Option, index: number) => (
          <CheckBox
            key={getItemValue(item) + String(index)}
            checked={isChecked(item)}
            onChange={(checked: boolean) =>
              changeHanlder(checked, getItemValue(item))
            }
            disabled={isDisabled(item)}
          >
            {getItemValue(item)}
          </CheckBox>
        ))
      : null;
  }, [options, checkedValues]);

  useEffect(() => {
    if (indeterminate) {
      const res = options.reduce(
        (prev: Array<string | number>, cur: string | number | Option) => {
          return [...prev, getItemValue(cur)];
        },
        [],
      );
      hasCheckAll.current = true;
      setCheckedValues(res);
      onChange?.(res);
    } else if (
      !indeterminate &&
      !initDefault.current &&
      defaultValue &&
      defaultValue.length
    ) {
      setCheckedValues([...defaultValue]);
      onChange?.([...defaultValue]);
      initDefault.current = true;
    } else if (
      !indeterminate &&
      !hasCheckAll.current &&
      defaultValue &&
      defaultValue.length
    ) {
      return
    } else {
      setCheckedValues([]);
      onChange?.([]);
    }
  }, [indeterminate, defaultValue]);

  return <div className="happy-checkbox-group">{renderOptions}</div>;
};

export default CheckBoxGroup;

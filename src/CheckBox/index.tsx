import cs from 'classnames';
import React, { FC, useMemo, useState } from 'react';
import CheckBoxGroup from './CheckBoxGroup';
import './index.less';
import { ICheckBoxProps } from './interface';

const InternalCheckBox: FC<ICheckBoxProps> = ({
  className,
  style = {},
  checked = false,
  disabled = false,
  onChange,
  children,
}) => {
  const [checkStatus, setCheckStatus] = useState<boolean>(checked);
  const checkBoxWrapperClass = useMemo(() => {
    return cs({
      'happy-checkbox': true,
      // 'happy-checkbox-disabled': disabled,
      className,
    });
  }, []);
  const checkBoxStatusClass = useMemo(() => {
    return cs({
      'happy-checkbox-default': !checkStatus,
      'happy-checkbox-checked': checkStatus,
      'happy-checkbox-disabled': disabled,
    });
  }, [disabled, checkStatus]);

  const toggleCheckedStatus = () => {
    if (disabled) return;
    setCheckStatus(!checkStatus);
    onChange?.(!checkStatus);
  };

  return (
    <div
      className={checkBoxWrapperClass}
      style={style}
      onClick={toggleCheckedStatus}
    >
      <div className="happy-checkbox-content">
        <div className={checkBoxStatusClass}>
          <div className="happy-checkbox-inner"></div>
        </div>
        <div
          className={
            disabled ? `happy-checkbox-text-disabled` : `happy-checkbox-text`
          }
        >
          {children}
        </div>
      </div>
    </div>
  );
};

type CompoundedComponent = React.ForwardRefExoticComponent<ICheckBoxProps> & {
  Group: typeof CheckBoxGroup;
};

const CheckBox = InternalCheckBox as CompoundedComponent;
CheckBox.Group = CheckBoxGroup

export default CheckBox;

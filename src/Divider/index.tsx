import cs from 'classnames';
import { isNumber } from '../../common/utils';
import React, { FC, useMemo } from 'react';
import { IDividerProps } from './interface';
import './index.less';

const Divider: FC<IDividerProps> = ({
  type = 'horizontal',
  dashed = false,
  orientation = 'center',
  orientationMargin,
  plain = false,
  className = '',
  style = {},
  children,
}) => {
  const dividerClass = useMemo(() => {
    return cs({
      'happy-divider': true,
      'happy-divider-horizontal': type === 'horizontal',
      'happy-divider-with-text': children,
      'happy-divider-vertical': type === 'vertical',
      'happy-divider-dashed': dashed,
      'happy-divider-with-text-left': orientation === 'left',
      'happy-divider-with-text-center': orientation === 'center',
      'happy-divider-with-text-right': orientation === 'right',
      'happy-divier-plain': plain,
    });
  }, [type, dashed, orientation, orientationMargin, plain]);

  const innerTextStyle = useMemo(() => {
    let v: string = '';
    if (orientation && orientation !== 'center' && orientationMargin) {
      if (typeof orientationMargin === 'number') {
        v = `${orientationMargin}px`;
      }
      if (typeof orientationMargin === 'string') {
        v = isNumber(orientationMargin)
          ? `${orientationMargin}px`
          : orientationMargin;
      }
      return orientation === 'left' ? { marginLeft: v } : { marginRight: v };
    }
    return {};
  }, [orientationMargin, orientation]);

  return (
    <div className={`${dividerClass} ${className}`} role="separator">
      {children && (
        <span
          className="happy-divider-inner-text"
          style={{ ...innerTextStyle, ...style }}
        >
          {children}
        </span>
      )}
    </div>
  );
};

export default Divider;

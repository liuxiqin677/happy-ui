import cs from 'classnames';
import React, { FC, useMemo } from 'react';
import '../common.less';
import './index.less';
import { SkeletonInputProps } from './interface';

const InputComponent: FC<SkeletonInputProps> = ({
  active = false,
  size = 'default',
  block = false,
}) => {
  const skeletonInputWrapperClass = useMemo(() => {
    return cs({
      'happy-skeleton happy-skeleton-element': true,
      'happy-skeleton-input-block': block,
    });
  }, [block]);

  const skeletonInputClass = useMemo(() => {
    return cs({
      'happy-skeleton-input': true,
      'happy-skeleton-input-lg': size === 'large',
      'happy-skeleton-input-sm': size === 'small',
      'happy-skeleton-input-active': active,
    });
  }, [size, active]);

  return (
    <div className={skeletonInputWrapperClass}>
      <span className={skeletonInputClass}></span>
    </div>
  );
};

export default InputComponent;

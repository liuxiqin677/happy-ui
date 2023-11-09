import cs from 'classnames';
import React, { FC, useMemo } from 'react';
import '../common.less';
import './index.less';
import { SkeletonButtonProps } from './interface';

const ButtonCompoent: FC<SkeletonButtonProps> = ({
  active = false,
  shape = 'square',
  size = 'default',
  block = false,
}) => {
  const skeletonButtonWrapperClass = useMemo(() => {
    return cs({
      'happy-skeleton happy-skeleton-element': true,
      'happy-skeleton-button-block': block,
    });
  }, [block]);

  const skeletonButtonClass = useMemo(() => {
    return cs({
      'happy-skeleton-button': true,
      'happy-skeleton-button-lg': size === 'large',
      'happy-skeleton-button-sm': size === 'small',
      'happy-skeleton-button-circle': shape === 'circle',
      'happy-skeleton-button-round': shape === 'round',
      'happy-skeleton-button-square': shape === 'square',
      'happy-skeleton-button-active': active,
    });
  }, [size, shape, active]);

  return (
    <div className={skeletonButtonWrapperClass}>
      <span className={skeletonButtonClass}></span>
    </div>
  );
};

export default ButtonCompoent;

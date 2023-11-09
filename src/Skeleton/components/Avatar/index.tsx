import cs from 'classnames';
import React, { FC, useMemo } from 'react';
import '../common.less';
import './index.less';
import { ISkeletonAvatarProps } from './interface';

export const defaultAvatar = {
  active: false,
  shape: 'circle',
  size: 'large',
};

const AvatarComponent: FC<ISkeletonAvatarProps> = ({
  active = false,
  shape = 'circle',
  size = 'default',
}) => {
  const skeletonAvatarClass = useMemo(() => {
    return cs({
      'happy-skeleton-avatar': true,
      'happy-skeleton-avatar-lg': size === 'large',
      'happy-skeleton-avatar-sm': size === 'small',
      'happy-skeleton-avatar-circle': shape === 'circle',
      'happy-skeleton-avatar-square': shape === 'square',
      'happy-skeleton-avatar-active': active,
    });
  }, [size, shape, active]);

  const skeletonAvatarStyle = useMemo(() => {
    if (size && typeof size === 'number') {
      return {
        width: `${size}px`,
        height: `${size}px`,
        lineHeight: `${size}px`,
      };
    }
    return {};
  }, [size]);

  return (
    <div className="happy-skeleton happy-skeleton-element">
      <span
        className={skeletonAvatarClass}
        style={{ ...skeletonAvatarStyle }}
      ></span>
    </div>
  );
};

export default AvatarComponent;

import cs from 'classnames';
import { isNumber } from 'happy-ui/utils';
import React, { FC, ReactNode, useCallback, useMemo } from 'react';
import AvatarComponent, {
  ISkeletonAvatarProps,
  defaultAvatar,
} from './components/Avatar/index';
import ButtonCompoent from './components/Button';
import ImageComponent from './components/Image';
import InputComponent from './components/Input';
import './index.less';

export interface ISkeletonTitleProps {
  width?: number | string;
}

export interface ISkeletonProps {
  active?: boolean;
  loading?: boolean;
  title?: boolean | ISkeletonTitleProps;
  avatar?: boolean | ISkeletonAvatarProps;
  rows?: number; //展示几行 paragraph，默认 3 行
  width?: Array<number | string>; //每行 paragraph 的长度，数字是 `${value}px`，字符串需要指定单位；没传的 row 默认 100%
  children?: ReactNode;
}

const InternalSkeleton: FC<ISkeletonProps> = ({
  active = false,
  loading = true,
  title = true,
  avatar = false,
  rows = 3,
  width = [],
  children,
}) => {
  /**
   * 计算 paragraph 每一项的宽度
   */
  const caculteParagraphWidth = useCallback(
    (index: number) => {
      if (index !== rows - 1) {
        if (typeof width[index] === 'string' && width[index]) {
          return {
            width: `${width[index]}`,
          };
        } else if (typeof width[index] === 'number') {
          return {
            width: `${width[index]}px`,
          };
        } else {
          return {
            width: `100%`,
          };
        }
      } else {
        return {
          width: `${
            width[index]
              ? typeof width[index] === 'number'
                ? `${width[index]}px`
                : `${width[index]}`
              : '61%'
          }`,
        };
      }
    },
    [width],
  );

  const skeletonWrapperClass = useMemo(() => {
    return cs({
      'happy-skeleton': true,
      'happy-skeleton-active': active,
    });
  }, [active]);

  const skeletonTitleStyle = useMemo(() => {
    if (title && typeof title === 'object') {
      return {
        width:
          typeof title.width === 'number'
            ? `${title.width}px`
            : `${title.width}`,
      };
    }
    return {};
  }, [title]);

  const skeletonAvatorClass = useMemo(() => {
    return cs({
      'happy-skeleton-avatar': true,
      'happy-skeleton-avatar-lg':
        (typeof avatar === 'boolean' && avatar) ||
        (typeof avatar === 'object' &&
          (avatar.size
            ? avatar.size === 'large'
            : defaultAvatar.size === 'large')),
      'happy-skeleton-avatar-sm':
        typeof avatar === 'object' && avatar.size === 'small',
      'happy-skeleton-avatar-circle':
        (typeof avatar === 'boolean' && avatar) ||
        (typeof avatar === 'object' &&
          (avatar.shape
            ? avatar.shape === 'circle'
            : defaultAvatar.shape === 'circle')),
      'happy-skeleton-avatar-square':
        typeof avatar === 'object' && avatar.shape === 'square',
    });
  }, [avatar]);

  const skeletonAvatorStyle = useMemo(() => {
    if (typeof avatar === 'object' && isNumber(String(avatar.size))) {
      return {
        width: `${avatar.size}px`,
        height: `${avatar.shape}px`,
        lineHeight: `${avatar.size}px`,
      };
    }
    return {};
  }, [avatar]);

  return loading ? (
    <div className={skeletonWrapperClass}>
      {avatar && (
        <div className="happy-skeleton-header">
          <span
            className={skeletonAvatorClass}
            style={skeletonAvatorStyle}
          ></span>
        </div>
      )}
      <div className="happy-skeleton-content">
        {title && (
          <div
            className="happy-skeleton-title"
            style={skeletonTitleStyle}
          ></div>
        )}
        <div className="happy-skeleton-paragraph">
          {new Array(rows).fill(1).map((r, i) => (
            <li key={r + i} style={caculteParagraphWidth(i)}></li>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <>{children}</>
  );
};

type CompoundedComponent = React.ForwardRefExoticComponent<ISkeletonProps> & {
  Avatar: typeof AvatarComponent;
  Button: typeof ButtonCompoent;
  Input: typeof InputComponent;
  Image: typeof ImageComponent;
};

const Skeleton = InternalSkeleton as CompoundedComponent;

Skeleton.Avatar = AvatarComponent;
Skeleton.Button = ButtonCompoent;
Skeleton.Input = InputComponent;
Skeleton.Image = ImageComponent;

export default Skeleton;

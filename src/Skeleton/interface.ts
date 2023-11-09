import { ReactNode } from 'react';
import { ISkeletonAvatarProps } from './components/Avatar/interface';

interface ISkeletonProps {
  active?: boolean;
  loading?: boolean;
  title?: boolean | ISkeletonTitleProps;
  avatar?: boolean | ISkeletonAvatarProps;
  rows?: number; //展示几行 paragraph，默认 3 行
  width?: Array<number | string>; //每行 paragraph 的长度，数字是 `${value}px`，字符串需要指定单位；没传的 row 默认 100%
  children?: ReactNode;
}

interface ISkeletonTitleProps {
  width?: number | string;
}

export { ISkeletonProps, ISkeletonTitleProps };

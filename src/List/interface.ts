import { CSSProperties, ReactNode } from 'react';

export type TListSize = 'default' | 'small' | 'large';

interface IListProps {
  className?: string;
  style?: CSSProperties;
  dataSource: Array<any>;
  renderItem: (item: any, index: number) => any;
  header?: ReactNode;
  footer?: ReactNode;
  size?: TListSize;
  loadMore?: boolean;
  isVirtualList?: boolean; //是否开启虚拟列表
  virtualShowNum?: number; //默认展示多少行
  lazyScrollAtBottom?: (bottomDistance: number, loadMore: boolean) => any; //懒加载滚动到底部监听
}

interface IListItemProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export { IListItemProps, IListProps };

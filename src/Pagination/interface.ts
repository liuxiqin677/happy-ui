import { CSSProperties } from 'react';

type TPaginationSize = 'defalut' | 'small';

interface IPaginationProps {
  className?: string;
  style?: CSSProperties;
  current?: number;
  defaultCurrent?: number;
  defaultPageSize?: number;
  pageSize?: number;
  pageSizeOptions?: number[]; // [10, 20, 50, 100]
  showSizeChanger?: boolean; // 是否展示切换器，total 大于 50 时默认 true
  total: number;
  onChange?: (page: number, pageSize: number) => void;
  onShowSizeChange?: (current: number, size: number) => void;
  size?: TPaginationSize;
  showQuickJumper?: boolean;
}

export { IPaginationProps };

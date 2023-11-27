import { CSSProperties, ReactNode } from 'react';

interface ITableProps {
  className?: string;
  style?: CSSProperties;
  columns: Array<TTableThType>;
  data: Array<any>;
  align?: 'left' | 'center' | 'right';
  width?: string;
  expandedRowRender?: Function;
  radio?: boolean;
  checked?: boolean;
  onRadioCallback?: Function;
  onCheckedCallback?: Function;
  sortable?: boolean;
  filter?: boolean;
  sorter?: boolean | Array<Function>;
  virtualized?: boolean;
  virtualListNum?: number;
  lazyLoad?: boolean;
  pagination?: boolean;
  paginationAlign?: 'left' | 'right' | 'center';
  pageSizeOption?: Array<number>;
  onPageNumberChange?: Function;
  onPageSizeChange?: Function;
  children?: ReactNode;
}

interface TTableThType {
  key: string;
  title: string | number;
  dataIndex: string | number;
  width?: string;
  sorter?: boolean | Array<Function> | number | string;
  filter?: boolean | string;
}

export type { ITableProps, TTableThType };

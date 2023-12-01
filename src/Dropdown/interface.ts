import { CSSProperties, ReactNode } from 'react';

type dataType = {
  content: string;
  link?: string;
  children?: dataType[];
  visible?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
};

type TTrickType = 'hover' | 'click';

type TStatus = 'default' | 'primary' | 'error' | 'warning' | 'success';

type TPosition = 'top' | 'bottom' | 'left' | 'right';

interface IDropdownProps {
  className?: string;
  style?: CSSProperties;
  data: Array<string> | Array<dataType>;
  placeholder?: string;
  disabled?: boolean;
  type?: TTrickType;
  status?: TStatus;
  position?: TPosition;
}

export type { IDropdownProps, TPosition, TStatus, TTrickType, dataType };

import { MouseEvent, ReactNode } from 'react';
interface IInternalMenuProps {
  single?: boolean;
  menuId?: number;
  lastExpandItem?: string;
  submitExpandId?: any;
  indent?: number;
  subMenuItem?: boolean;
  className?: string;
  expand?: boolean;
}

interface IInternalSubMenuProps extends IInternalMenuProps {}

interface IMenuProps {
  single?: boolean;
  children?: ReactNode;
  className?: string;
}

interface IMenuItemProps extends IInternalMenuProps {
  to?: string;
  icon?: ReactNode;
  disabled?: boolean;
  onClick?: (event: MouseEvent, navMenuItemData: any) => any;
  label?: string;
  children?: ReactNode;
}

interface ISubMenuProps extends IInternalMenuProps {
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
  onClick?: (event: MouseEvent, navMenuItemData: any) => any;
  expand?: boolean;
  children?: ReactNode;
}

interface IMenuContext {
  readonly single?: boolean;
  readonly lastExpandItem?: string;
  readonly submitExpandId?: any;
  readonly selectedItem?: string;
  readonly submitSelectedItem?: any;
}

export type {
  IInternalMenuProps,
  IInternalSubMenuProps,
  IMenuContext,
  IMenuItemProps,
  IMenuProps,
  ISubMenuProps,
};

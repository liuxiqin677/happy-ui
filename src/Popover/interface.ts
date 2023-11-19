import { CSSProperties, ReactElement, ReactNode } from 'react';

type TPlacement = 'left' | 'bottom' | 'right' | 'top';

type TTriggerWay = 'hover' | 'click';

interface IPopoverProps {
  className?: string;
  style?: CSSProperties;
  content?: ReactNode;
  title?: ReactNode;
  placement?: TPlacement;
  trigger?: TTriggerWay;
  active?: boolean; //是否激活
  onChange?: (visible: boolean) => void;
  children?: ReactElement;
}

interface IPopoverRef {
  setVisible: (visible: boolean) => void;
}

export { IPopoverProps, IPopoverRef, TPlacement, TTriggerWay };

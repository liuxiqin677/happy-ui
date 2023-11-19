import React, { FC, createContext, useState } from 'react';
import { bindImplicitProps } from '../../common/utils';
import MenuItem from './MenuItem';
import SubMenu from './SubMenu';
import './index.less';
import { IMenuContext, IMenuProps } from './interface';

export const ctx = createContext<IMenuContext>({});

const InternalMenu: FC<IMenuProps> = ({
  children,
  className = '',
  single = false,
}) => {
  const [lastExpandItemId, setLastExpandItemId] = useState<string>();
  const [selectedItem, setSelectedItem] = useState<string>();

  const childNodes = bindImplicitProps(React.Children.toArray(children), {
    lastExpandItem: lastExpandItemId,
    submitExpandId: setLastExpandItemId,
  });

  const contextValue = {
    single,
    selectedItem,
    submitSelectedItem: setSelectedItem,
  };

  return (
    <ul className={`happy-navMenu ${className}`}>
      <ctx.Provider value={contextValue}>{childNodes}</ctx.Provider>
    </ul>
  );
};

type CompoundedComponent = React.ForwardRefExoticComponent<IMenuProps> & {
  Item: typeof MenuItem;
  SubMenu: typeof SubMenu;
};

const Menu = InternalMenu as CompoundedComponent;
Menu.Item = MenuItem;
Menu.SubMenu = SubMenu;

export default Menu;

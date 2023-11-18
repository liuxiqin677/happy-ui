import { Menu } from 'happy-ui';
import React from 'react';

export default () => {
  const itemClick = (
    event: React.MouseEvent<Element, MouseEvent>,
    navMenuItemData: any,
  ) => {
    console.log('itemClick', navMenuItemData);
  };
  return (
    <Menu single>
      <Menu.Item label="项目 1" onClick={itemClick} />
      <Menu.Item label="项目 2" onClick={itemClick} />
      <Menu.SubMenu label="菜单 1">
        <Menu.Item label="项目 1-1" onClick={itemClick} />
        <Menu.Item label="项目 2-2" onClick={itemClick} />
        <Menu.Item label="项目 3-3" onClick={itemClick} />
      </Menu.SubMenu>
    </Menu>
  );
};

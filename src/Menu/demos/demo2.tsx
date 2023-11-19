import { Menu } from 'happy-ui';
import React from 'react';

export default () => {
  return (
    <Menu single>
      <Menu.SubMenu label="菜单 1">
        <Menu.Item label="项目 1-1" />
        <Menu.Item label="项目 2-2" />
        <Menu.Item label="项目 3-3" />
      </Menu.SubMenu>
      <Menu.SubMenu label="菜单 2">
        <Menu.Item label="项目 2-1" />
        <Menu.Item label="项目 2-2" />
        <Menu.Item label="项目 2-3" />
      </Menu.SubMenu>
      <Menu.SubMenu label="菜单 3">
        <Menu.Item label="项目 3-1" />
        <Menu.Item label="项目 3-2" />
        <Menu.Item label="项目 3-3" />
      </Menu.SubMenu>
      <Menu.SubMenu label="菜单 4">
        <Menu.Item label="项目 4-1" />
        <Menu.Item label="项目 4-2" />
        <Menu.Item label="项目 4-3" />
      </Menu.SubMenu>
    </Menu>
  );
};

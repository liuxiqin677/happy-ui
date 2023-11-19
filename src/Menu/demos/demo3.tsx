import { Menu } from 'happy-ui';
import React from 'react';

export default () => {
  return (
    <Menu single>
      <Menu.Item label="项目 1" />
      <Menu.Item label="项目 2" />
      <Menu.SubMenu label="菜单 1">
        <Menu.Item label="项目 1-1" />
        <Menu.Item label="项目 2-2" />
        <Menu.Item label="项目 3-3" />
        <Menu.SubMenu label="菜单 1-2">
          <Menu.Item label="项目 1-2-1" />
          <Menu.Item label="项目 1-2-2" />
          <Menu.Item label="项目 1-2-3" />
        </Menu.SubMenu>
      </Menu.SubMenu>
    </Menu>
  );
};

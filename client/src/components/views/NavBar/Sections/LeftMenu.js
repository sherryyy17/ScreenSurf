import React from 'react';
import { Menu } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  return (
    <Menu mode={props.mode} style={{ fontSize: '18px' }}>
      <Menu.Item key="mail">
        <a href="/"><b>Home</b></a>
      </Menu.Item>
      <Menu.Item key="favorite">
        <a href="/favorite"><b>Favorites</b></a>
      </Menu.Item>

    </Menu>
  )
}

export default LeftMenu
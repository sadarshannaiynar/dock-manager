import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';

const SidebarComponent = () => (
  <Menu vertical fixed="left">
    <Menu.Item className="nav-sidebar-menu-item" name="containers" active>
      <Icon name="tasks" />
      Containers
    </Menu.Item>
    <Menu.Item className="nav-sidebar-menu-item" name="images">
      <Icon name="book" />
      Images
    </Menu.Item>
  </Menu>
);

export default SidebarComponent;

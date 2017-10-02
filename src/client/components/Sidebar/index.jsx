import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';

class SidebarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'containers',
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event, { name }) {
    this.setState({
      activeItem: name,
    });
  }
  render() {
    const { activeItem } = this.state;
    return (
      <Menu fixed="left" icon="labeled" id="nav-sidebar" pointing vertical>
        <Menu.Item
          active={activeItem === 'containers'}
          className="nav-sidebar-menu-item"
          name="containers"
          onClick={this.handleClick}
        >
          <Icon name="tasks" />
          Containers
        </Menu.Item>
        <Menu.Item
          active={activeItem === 'images'}
          className="nav-sidebar-menu-item"
          name="images"
          onClick={this.handleClick}
        >
          <Icon name="book" />
          Images
        </Menu.Item>
      </Menu>
    );
  }
}

export default SidebarComponent;

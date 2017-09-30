/* eslint no-unused-expressions: 0 */
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import SidebarComponent from 'components/Sidebar';

const initiator = () => {
  const props = {};
  const wrapper = shallow(<SidebarComponent />);

  return { wrapper, props };
};

describe('Testing the SidebarComponent', () => {
  describe('Rendering Tests', () => {
    const { wrapper } = initiator();

    it('Must render the component', () => {
      expect(wrapper.exists()).to.be.true;
    });

    it('Must render the Menu component', () => {
      expect(wrapper.find('Menu').exists()).to.be.true;
    });

    it('Must render the Menu vertically and must be fixed to left', () => {
      expect(wrapper.find('Menu').props().vertical).to.be.true;
      expect(wrapper.find('Menu').props().fixed).to.be.eql('left');
    });

    it('Must render 2 Menu.Item components', () => {
      expect(wrapper.find('MenuItem').exists()).to.be.true;
      expect(wrapper.find('MenuItem')).to.have.length(2);
    });

    it('Must render the containers menu item', () => {
      const ContainersMenuItemWrapper = wrapper.find('MenuItem').at(0);
      expect(ContainersMenuItemWrapper.props().name).to.deep.equal('containers');
      expect(ContainersMenuItemWrapper.find('Icon').exists()).to.be.true;
      expect(ContainersMenuItemWrapper.find('Icon').props().name).to.be.eql('tasks');
      expect(ContainersMenuItemWrapper.childAt(1).text()).to.deep.equal('Containers');
    });

    it('Must render the images menu item', () => {
      const ImagesMenuItemWrapper = wrapper.find('MenuItem').at(1);
      expect(ImagesMenuItemWrapper.props().name).to.deep.equal('images');
      expect(ImagesMenuItemWrapper.find('Icon').exists()).to.be.true;
      expect(ImagesMenuItemWrapper.find('Icon').props().name).to.be.eql('book');
      expect(ImagesMenuItemWrapper.childAt(1).text()).to.be.eql('Images');
    });
  });
});

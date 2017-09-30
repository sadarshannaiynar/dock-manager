/* eslint no-unused-expressions: 0 */
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import App from 'components/App';

const initiator = () => {
  const props = {
    value: 1,
    increment: () => ({}),
    decrement: () => ({}),
  };

  const wrapper = shallow(<App {...props} />);

  return { wrapper, props };
};

describe('Testing App Component', () => {
  describe('Rendering Tests', () => {
    const { wrapper } = initiator();

    it('must render component', () => {
      expect(wrapper.exists()).to.be.true;
    });

    it('Must render the div#main-view element', () => {
      expect(wrapper.find('div#main-view').exists()).to.be.true;
    });

    it('Must render the SidebarComponent element', () => {
      expect(wrapper.find('SidebarComponent').exists()).to.be.true;
    });
  });
});

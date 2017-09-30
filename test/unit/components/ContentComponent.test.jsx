/* eslint no-unused-expressions: 0 */
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import ContentComponent from 'components/ContentComponent';

const initiator = () => {
  const props = {};

  const wrapper = shallow(<ContentComponent {...props} />);

  return { wrapper, props };
};

describe('Testing the ContentComponent', () => {
  describe('Rendering Tests', () => {
    const { wrapper } = initiator();

    it('must render component', () => {
      expect(wrapper.exists()).to.be.true;
    });

    it('Must render the div#content-view element', () => {
      expect(wrapper.find('div#content-view').exists()).to.be.true;
    });

    it('Must render the DockerProcessContainer', () => {
      expect(wrapper.find('Connect(DockerProcessComponent)').exists()).to.be.true;
    });
  });
});

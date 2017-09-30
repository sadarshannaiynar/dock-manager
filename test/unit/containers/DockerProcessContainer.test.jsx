/* eslint no-unused-expressions: 0 */
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { spy } from 'sinon';
import configureMockStore from 'redux-mock-store';
import DockerProcessContainer from 'containers/DockerProcessContainer';

const initiator = () => {
  const mockStore = configureMockStore();

  const store = mockStore({
    containerReducer: {
      successLog: [],
      errorLog: '',
    },
  });

  const dispatchSpy = spy();
  store.dispatch = dispatchSpy;

  const wrapper = shallow(<DockerProcessContainer store={store} />);

  return { wrapper, dispatchSpy };
};

describe('Testing the DockerProcessContainer', () => {
  describe('Rendering Tests', () => {
    const { wrapper } = initiator();

    it('must render component', () => {
      expect(wrapper.exists()).to.be.true;
    });

    it('Must be connected to DockerProcessComponent', () => {
      expect(wrapper.find('DockerProcessComponent').exists()).to.be.true;
    });
  });

  describe('Props Tests', () => {
    const { wrapper } = initiator();

    it('Must have the successLog prop', () => {
      expect(wrapper.props().successLog).to.not.be.undefined;
      expect(wrapper.props().successLog).to.deep.equal([]);
    });

    it('Must have the errorLog prop', () => {
      expect(wrapper.props().errorLog).to.not.be.undefined;
      expect(wrapper.props().errorLog).to.be.eql('');
    });
  });

  describe('Dispatch Tests', () => {
    const { wrapper, dispatchSpy } = initiator();

    it('Must dispatch getAllContainers', () => {
      dispatchSpy.reset();
      wrapper.props().getAllContainers();
      expect(dispatchSpy.calledOnce).to.be.true;
    });
  });
});

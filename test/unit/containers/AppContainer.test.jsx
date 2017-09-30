/* eslint no-unused-expressions: 0 */
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { spy } from 'sinon';
import configureMockStore from 'redux-mock-store';
import AppContainer from 'containers/AppContainer';

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

  const wrapper = shallow(<AppContainer store={store} />);

  return { wrapper, dispatchSpy };
};

describe('Testing App Container', () => {
  describe('Rendering Tests', () => {
    const { wrapper } = initiator();

    it('must render component', () => {
      expect(wrapper.exists()).to.be.true;
    });

    it('Must be connected to AppComponent', () => {
      expect(wrapper.find('App').exists()).to.be.true;
    });
  });
});

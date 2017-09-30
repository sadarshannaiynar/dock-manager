import { expect } from 'chai';
import reducer from 'reducers/containerReducer';

describe('Testing the containerReducer', () => {
  const containers = [{
    id: '123456789012',
    fullId: '123456789012345',
    names: ['container'],
    command: 'command',
    ports: ['2000'],
    status: 'running',
  }];

  describe('Testing with default state', () => {
    it('Must return the same state for undefined action', () => {
      const action = { type: 'UNDEFINED_ACTION' };
      const nextState = reducer(undefined, action);
      expect(nextState).to.deep.equal({
        successLog: [],
        errorLog: '',
      });
    });

    it('Must return the next state on GET_ALL_CONTAINERS_SUCCESS action', () => {
      const action = {
        type: 'GET_ALL_CONTAINERS_SUCCESS',
        payload: containers,
      };
      const nextState = reducer(undefined, action);
      expect(nextState).to.deep.equal({
        successLog: [...containers],
        errorLog: '',
      });
    });

    it('Must return the next state on GET_ALL_CONTAINERS_FAIL action', () => {
      const action = {
        type: 'GET_ALL_CONTAINERS_FAIL',
        payload: 'error',
      };
      const nextState = reducer(undefined, action);
      expect(nextState).to.deep.equal({
        successLog: [],
        errorLog: 'error',
      });
    });
  });

  describe('Testing with non-default state', () => {
    it('Must return the same state for undefined action', () => {
      const previousState = { successLog: [...containers], errorLog: '' };
      const action = { type: 'UNDEFINED_ACTION' };
      const nextState = reducer(previousState, action);
      expect(nextState).to.deep.equal({
        successLog: [...containers],
        errorLog: '',
      });
    });

    it('Must return the next state on GET_ALL_CONTAINERS_SUCCESS action with success previous state', () => {
      const previousState = { successLog: [...containers], errorLog: '' };
      const newContainers = [{
        id: '0987654321098',
        fullId: '098765432109876',
        names: ['new_container'],
        command: 'new_command',
        ports: ['5000'],
        status: 'exited',
      }];
      const action = {
        type: 'GET_ALL_CONTAINERS_SUCCESS',
        payload: newContainers,
      };
      const nextState = reducer(previousState, action);
      expect(nextState).to.deep.equal({
        successLog: [...newContainers],
        errorLog: '',
      });
    });

    it('Must return the next state on GET_ALL_CONTAINERS_SUCCESS action with failed previous state', () => {
      const previousState = { successLog: [], errorLog: 'error' };
      const action = {
        type: 'GET_ALL_CONTAINERS_SUCCESS',
        payload: containers,
      };
      const nextState = reducer(previousState, action);
      expect(nextState).to.deep.equal({
        successLog: [...containers],
        errorLog: '',
      });
    });

    it('Must return the next state on GET_ALL_CONTAINERS_FAIL action with success previous state', () => {
      const previousState = { successLog: [...containers], errorLog: '' };
      const action = {
        type: 'GET_ALL_CONTAINERS_FAIL',
        payload: 'error',
      };
      const nextState = reducer(previousState, action);
      expect(nextState).to.deep.equal({
        successLog: [],
        errorLog: 'error',
      });
    });

    it('Must return the next state on GET_ALL_CONTAINERS_FAIL action with failed previous state', () => {
      const previousState = { successLog: [], errorLog: 'error' };
      const action = {
        type: 'GET_ALL_CONTAINERS_FAIL',
        payload: 'new_error',
      };
      const nextState = reducer(previousState, action);
      expect(nextState).to.deep.equal({
        successLog: [],
        errorLog: 'new_error',
      });
    });
  });
});

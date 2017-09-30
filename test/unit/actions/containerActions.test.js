import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ipcMock from 'electron-ipc-mock';
import * as actions from 'actions/containerActions';

const mockStore = configureMockStore([thunk]);

describe('Testing the containerActions', () => {
  describe('Individual Actions Tests', () => {
    const log = '123456789012345<br>container<br>command<br>2000<br>running\n';

    const containers = [{
      id: '123456789012',
      fullId: '123456789012345',
      names: ['container'],
      command: 'command',
      ports: ['2000'],
      status: 'running',
    }];

    it('Must return getAllContainersSuccess', () => {
      expect(actions.getAllContainersSuccess(containers)).to.deep.equal({
        type: 'GET_ALL_CONTAINERS_SUCCESS',
        payload: [...containers],
      });
    });

    it('Must return the getAllContainersFail', () => {
      expect(actions.getAllContainersFail('failed')).to.deep.equal({
        type: 'GET_ALL_CONTAINERS_FAIL',
        payload: 'failed',
      });
    });

    it('Must return the formatted output for success', () => {
      expect(actions.successFormatLog(log)).to.deep.equal([...containers]);
    });
  });

  describe('Store Dispatch Actions Tests', () => {
    const containers = [{
      id: '1',
      fullId: '123',
      name: ['container'],
      command: 'command',
      ports: ['2000'],
      status: 'running',
    }];

    it('Must dispatch the getAllContainersSuccess', () => {
      const store = mockStore({
        containerReducer: {
          successLog: [],
          errorLog: '',
        },
      });

      store.dispatch(actions.getAllContainersSuccess(containers));
      expect(store.getActions()[0]).to.deep.equal(actions.getAllContainersSuccess(containers));
    });

    it('Must dispatch the getAllContainersFail', () => {
      const store = mockStore({
        containerReducer: {
          successLog: [],
          errorLog: '',
        },
      });

      store.dispatch(actions.getAllContainersFail('failed'));
      expect(store.getActions()[0]).to.deep.equal(actions.getAllContainersFail('failed'));
    });

    it('Must dispatch the getAllContainers with success reply', () => {
      const { ipcMain, ipcRenderer } = ipcMock();

      const store = mockStore({
        containerReducer: {
          successLog: [],
          errorLog: '',
        },
      });

      const outputObj = {
        log: '123456789012345<br>container<br>command<br>3000<br>running\n',
      };

      ipcMain.on('get-all-containers', (event) => {
        event.sender.send('success-get-all-containers', outputObj);
      });

      store.dispatch(actions.getAllContainers(ipcRenderer));
      expect(store.getActions()[0]).to.deep.equal({ type: 'GET_ALL_CONTAINERS' });

      ipcRenderer.on('success-get-all-containers', (e, { log }) => {
        const formattedLog = actions.successFormatLog(log);
        expect(store.getActions()[1]).to.deep.equal(actions.getAllContainersSuccess(formattedLog));
      });
    });

    it('Must dispatch the getAllContainers with error reply', () => {
      const { ipcMain, ipcRenderer } = ipcMock();

      const store = mockStore({
        containerReducer: {
          successLog: [],
          errorLog: '',
        },
      });

      const outputObj = {
        log: 'error',
      };

      ipcMain.on('get-all-containers', (event) => {
        event.sender.send('error-get-all-containers', outputObj);
      });

      store.dispatch(actions.getAllContainers(ipcRenderer));
      expect(store.getActions()[0]).to.deep.equal({ type: 'GET_ALL_CONTAINERS' });

      ipcRenderer.on('error-get-all-containers', (e, { log }) => {
        expect(store.getActions()[1]).to.deep.equal(actions.getAllContainersFail(log));
      });
    });
  });
});

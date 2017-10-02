import actions from 'constants/actionTypes';
import _split from 'lodash/split';
import _pullAt from 'lodash/pullAt';
import _map from 'lodash/map';

export const getAllContainersSuccess = payload => ({
  type: actions.GET_ALL_CONTAINERS_SUCCESS,
  payload,
});

export const getAllContainersFail = payload => ({
  type: actions.GET_ALL_CONTAINERS_FAIL,
  payload,
});

export const successFormatLog = (rawLog) => {
  const splitLog = _split(rawLog, '\n');
  _pullAt(splitLog, [splitLog.length - 1]);
  return _map(splitLog, (each) => {
    const container = _split(each, '<br>');
    return {
      id: container[0].substring(0, 12),
      fullId: container[0],
      names: [...container[1].split(',')],
      command: container[2],
      ports: [...container[3].split(',')],
      status: container[4],
    };
  });
};

export const getAllContainers = ipcRenderer => (
  (dispatch) => {
    ipcRenderer.send('get-all-containers');
    dispatch({ type: actions.GET_ALL_CONTAINERS });

    ipcRenderer.once('success-get-all-containers', (event, { log }) => {
      dispatch(getAllContainersSuccess(successFormatLog(log)));
    });

    ipcRenderer.once('error-get-all-containers', (event, { log }) => {
      dispatch(getAllContainersFail(log));
    });
  });

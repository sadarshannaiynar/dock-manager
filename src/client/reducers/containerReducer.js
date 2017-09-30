import actions from 'constants/actionTypes';

const defaultState = {
  successLog: [],
  errorLog: '',
};

const containerReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actions.GET_ALL_CONTAINERS_SUCCESS:
      return {
        ...state,
        successLog: [...action.payload],
        errorLog: '',
      };
    case actions.GET_ALL_CONTAINERS_FAIL:
      return {
        ...state,
        errorLog: action.payload,
        successLog: [],
      };
    default:
      return { ...state };
  }
};

export default containerReducer;

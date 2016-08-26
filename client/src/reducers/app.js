import actions from '../actions';

const defaultState = {
  appName: 'InkExchange',
  token: null
};

export default (state = defaultState, action) => {
  switch(action.type) {
    case actions.LOAD_APP:
      return {
        ...state,
        token: action.token || null,
        appLoaded: true,
        currentUser: action.payload ? action.payload.user : null
      };

    default:
      return state;
  }
};

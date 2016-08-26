import actions from '../actions';

const defaultState = {
  ink: null
};

export default (state = defaultState, action) => {
  switch(action.type) {
    case actions.INK_LOADED:
      return {
        ...state,
        ink: action.payload[0].data || null,
        requestsHistory: action.payload[1].data.requests || []
      };

    default:
      return state;
  }
};

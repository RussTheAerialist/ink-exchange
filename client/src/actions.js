const actions = {
  LOAD_APP: 'LOAD_APP',
  LOAD_INKLIST: 'LOAD_INKLIST',
  INK_LOADED: 'INK_LOADED'
};

export const loadApp = () => ({ type: actions.LOAD_APP });
export const loadInkList = (payload) => ({ type: actions.LOAD_INKLIST, payload });
export const loadInk = (payload) => ({type: actions.INK_LOADED, payload });

export default actions;

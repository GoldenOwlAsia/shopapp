import {
  TOGGLE_LIST_PRODUCT,
} from './types';

export const toggleListProducts = () => (dispatch, getState) => {
  const state = getState();
  const app = state.App;
  dispatch({
    type: TOGGLE_LIST_PRODUCT,
    showList: !app.showList,
  })
}
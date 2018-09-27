import {
  TOGGLE_LIST_PRODUCT,
  SHOW_APP_LOADING,
  HIDE_APP_LOADING,
  SHOW_APP_ERROR,
  HIDE_APP_ERROR,
} from './types';

export const toggleListProducts = () => (dispatch, getState) => {
  const state = getState();
  const app = state.App;
  dispatch({
    type: TOGGLE_LIST_PRODUCT,
    showList: !app.showList,
  })
}

export const showAppLoading = () => ({
  type: SHOW_APP_LOADING,
})

export const hideAppLoading = () => ({
  type: HIDE_APP_LOADING,
})

export const showAppError = ({ title, message }) => ({
  type: SHOW_APP_ERROR,
  payload: { title, message },
})

export const hideAppError = () => ({
  type: HIDE_APP_ERROR,
})
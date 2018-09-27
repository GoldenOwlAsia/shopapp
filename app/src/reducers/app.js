import {
  TOGGLE_LIST_PRODUCT,
  SHOW_APP_LOADING,
  HIDE_APP_LOADING,
  SHOW_APP_ERROR,
  HIDE_APP_ERROR,
} from '../actions/types';

const INITIAL_STATE = {
  showList: true,
  loading: false,
  error: {
    visible: false,
    title: null,
    message: null,
  }
};

const errorReducer = (state = INITIAL_STATE.error, action) => {
  switch(action.type){
    case SHOW_APP_ERROR:
      return {
        ...state,
        visible: true,
        ...action.payload,
      }
    case HIDE_APP_ERROR:
      return {
        ...state,
        visible: false,
        title: null,
        message: null,
      }  
    default: return state;
  }
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TOGGLE_LIST_PRODUCT:
      return {
        ...state,
        showList: action.showList,
      };
    case SHOW_APP_LOADING:
      return {
        ...state,
        loading: true,
      };
    case HIDE_APP_LOADING:
      return {
        ...state,
        loading: false,
      };
    case SHOW_APP_ERROR:
    case HIDE_APP_ERROR:
      return {
        ...state,
        error: errorReducer(state.error, action),
      };   
	default:
      return state;
  }
}
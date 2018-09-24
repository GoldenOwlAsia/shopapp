import {
  LOADING_USER,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILED,
} from '../actions/types';

const initialState = {
  loading: false,
  error: null,
  data: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING_USER: 
      return {
        ...state,
        loading: true,
      }
    case LOAD_USER_SUCCESS: 
      return {
        ...state,
        loading: false,
        data: action.user,
      }
    case LOAD_USER_FAILED: 
      return {
        ...state,
        loading: false,
        error: action.error,
      }  
    default:
      return state
  }
};
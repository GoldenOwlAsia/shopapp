import {
  LOADING_STAFFS,
  LOAD_STAFFS_SUCCESS,
  LOAD_STAFFS_FAILED,
} from '../actions/types';

const initialState = {
  loading: false,
  error: null,
  data: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING_STAFFS: 
      return {
        ...state,
        loading: true,
      }
    case LOAD_STAFFS_SUCCESS: 
      return {
        ...state,
        loading: false,
        data: action.staffs,
      }
    case LOAD_STAFFS_FAILED: 
      return {
        ...state,
        loading: false,
        error: staffs.error,
      }  
    default:
      return state
  }
};
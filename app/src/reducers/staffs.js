import {
  LOADING_STAFFS,
  LOAD_STAFFS_SUCCESS,
  LOAD_STAFFS_FAILED,
  UPDATE_USER_SUCCESS,
  CREATE_USER_SUCCESS,
} from '../actions/types';
import { addObjectToArray } from '../utils/helpers';

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
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        data: addObjectToArray(action.user, state.data, 'id'),
      }  
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        data: [...state.data, ...[action.user]],
      }  
    default:
      return state
  }
};
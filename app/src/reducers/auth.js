import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  OWNER_LOGIN_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  authToken: null,
  isOwner: false,
  isAuthenticated: false,
  error: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return state;
    case LOGIN_SUCCESS:
    case OWNER_LOGIN_SUCCESS:
      return { ...state, isAuthenticated: true, authToken: action.payload.authToken, isOwner: action.payload.isOwner };
    case LOGIN_FAIL:
      return { ...state, error: action.payload.error };
	default:
      return state;
  }
}
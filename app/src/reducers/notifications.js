import {
  LOAD_NOTIFICATIONS_SUCCESS
} from '../actions/types';

const initialState = {
  notifications: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_NOTIFICATIONS_SUCCESS: 
      return {
        ...state,
        notifications: action.notifications,
      }
    default:
      return state
  }
};
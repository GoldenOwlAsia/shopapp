import {
  TOGGLE_LIST_PRODUCT,
} from '../actions/types';

const INITIAL_STATE = {
  showList: true,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TOGGLE_LIST_PRODUCT:
      return {
        ...state,
        showList: action.showList,
      };
	default:
      return state;
  }
}
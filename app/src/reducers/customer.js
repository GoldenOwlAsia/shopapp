import {
  CREATE_CUSTOMER,
  CREATE_CUSTOMER_SUCCESS,
  CREATE_CUSTOMER_FAIL,
  CLEAR_SELECTED_CUSTOMER
} from '../actions/types';

const initialState = {
  list: [],
  selectedCustomer: null,
  totalItems: 0,
  error: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_CUSTOMER_SUCCESS:
      return { ...state, list: [...state.list, action.payload], selectedCustomer: action.payload.id }
    case CLEAR_SELECTED_CUSTOMER:
      return { ...state, selectedCustomer: null }
    default:
      return state
  }
};
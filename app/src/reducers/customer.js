import {
  CREATE_CUSTOMER,
  CREATE_CUSTOMER_SUCCESS,
  CREATE_CUSTOMER_FAIL,
  CLEAR_SELECTED_CUSTOMER,
  CHANGE_SELECTED_CUSTOMER,
  UPDATE_CUSTOMER_SUCCESS
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
    case CHANGE_SELECTED_CUSTOMER:
      return { ...state, selectedCustomer: action.payload.customerId }
    case UPDATE_CUSTOMER_SUCCESS: {
      const customers = [...state.list];
      const customerIndex = customers.findIndex((customer) => customer.id === action.payload.id);
      if (customerIndex > -1) customers[customerIndex] = { ...action.payload }
      return { ...state,  list: [...customers] }
    }
    default:
      return state
  }
};
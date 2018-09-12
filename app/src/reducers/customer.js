import {
  CREATE_CUSTOMER,
  CREATE_CUSTOMER_SUCCESS,
  CREATE_CUSTOMER_FAIL,
  CLEAR_SELECTED_CUSTOMER
} from '../actions/types';

const initialState = {
  list: [{
    id: 1,
    name: 'Customer 1',
    phoneNumber: '123456',
  }, {
    id: 2,
    name: 'Customer 2',
    phoneNumber: '123456',
  }, {
    id: 3,
    name: 'Customer 3',
    phoneNumber: '123456',
  }, {
    id: 4,
    name: 'Customer 4',
    phoneNumber: '123456',
  }, {
    id: 5,
    name: 'Customer 5',
    phoneNumber: '123456',
  }, {
    id: 6,
    name: 'Customer 6',
    phoneNumber: '123456',
  }, {
    id: 7,
    name: 'Customer 7',
    phoneNumber: '123456',
  }, {
    id: 8,
    name: 'Customer 8',
    phoneNumber: '123456',
  }, {
    id: 9,
    name: 'Customer 9',
    phoneNumber: '123456',
  }, {
    id: 10,
    name: 'Customer 10',
    phoneNumber: '123456',
  }],
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
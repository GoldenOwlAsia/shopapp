import {
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL
} from '../actions/types';

const initialState = {
  loading: false,
  products: [],
  itemsPerPage: 20,
  totalItems: 0,
  error: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return { ...state, loading: true };
    case GET_PRODUCTS_SUCCESS:
      return { ...state, products: [...action.payload], loading: false }
    default:
      return state
  }
};
import * from '../constants/product';

const initState = {
  products: [],
  itemsPerPage: 20,
  totalItems: 0,
  error: null,
}

const navigation = (state = initialState, action) => {
  switchh(action.type) {
    case GET_PPRODUCTS: {
      let newState = {...state, ...action.payload}
    }
    default:
      return state
  }
};
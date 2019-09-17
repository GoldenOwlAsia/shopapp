import {
  CREATE_ORDER,
  REMOVE_ITEM,
  INCREASE_ITEM_QUANTITY,
  DECREASE_ITEM_QUANTITY,
  CHECKOUT_SUCCESS,
  CHECKOUT_FAIL,
  UPDATE_ORDER_BY_CUSTOMER,
  LOAD_RECENT_ORDER,
  LOAD_RECENT_ORDER_SUCCESS,
  LOAD_RECENT_ORDER_FAILED,
} from '../actions/types';

const initialState = {
  list: {},
  loadingRecent: false,
  recents: [],
}

export default (state = initialState, action) => {
  switch(action.type) {
    case CREATE_ORDER: {
      return {
        ...state,
        list: {
          ...state.list,
          [action.payload.customerId]: action.payload.items,
        }
      };
    }
    case UPDATE_ORDER_BY_CUSTOMER: {
      return {
        ...state,
        list: {
          ...state.list, 
          [action.payload.customerId]: action.payload.items
        }
      }
    }
    case REMOVE_ITEM: {
      let list = { ...state.list };
      const customerId = action.payload.customerId;
      const items = list[customerId] || []; ;
      const itemIndex = items.map(item => item.id).indexOf(action.payload.itemId);
      itemIndex >= 0 && items.splice(itemIndex, 1);
      list[customerId] = [...items];
      return { ...state, list};
    }
    case INCREASE_ITEM_QUANTITY: {
      let list = { ...state.list };
      const customerId = action.payload.customerId;
      const itemId = action.payload.itemId;
      const items = (list[customerId] || []);
      const itemIndex = items.map(item => item.id).indexOf(itemId);
      const item = itemIndex >= 0 && items[itemIndex];
      item && item.quantity > -1 && item.quantity++;
      items[itemIndex] = item;
      list[customerId] = [...items];
      return { ...state, list }
    }
    case DECREASE_ITEM_QUANTITY: {
      let list = { ...state.list };
      const customerId = action.payload.customerId;
      const itemId = action.payload.itemId;
      const items = (list[customerId] || []);
      const itemIndex = items.map(item => item.id).indexOf(itemId);
      const item = itemIndex >= 0 && items[itemIndex];
      item && item.quantity > -1 && item.quantity--;
      if (item && item.quantity && item.quantity < 0) {
        item.quantity = 0;
      }
      items[itemIndex] = item;
      list[customerId] = [...items];
      return { ...state, list }
    }
    case CHECKOUT_SUCCESS: {
      // delete state.list[action.payload.customer.id];
      return { ...state };
    }
    case CHECKOUT_FAIL: {
      return state;
    }
    case LOAD_RECENT_ORDER:
      return {
        ...state,
        loadingRecent: true,
      }
    case LOAD_RECENT_ORDER_SUCCESS:
      return {
        ...state,
        loadingRecent: false,
        recents: action.orders,
      }
    case LOAD_RECENT_ORDER_FAILED:
      return {
        ...state,
        loadingRecent: false,
        recents: [],
      }   
    default: 
      return state;
  }
};
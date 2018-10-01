import {
  CREATE_ORDER,
  REMOVE_ITEM,
  INCREASE_ITEM_QUANTITY,
  DECREASE_ITEM_QUANTITY,
  CHECKOUT_SUCCESS,
  CHECKOUT_FAIL,
  UPDATE_ORDER_BY_CUSTOMER,
  GET_RECENT_ORDERS_SUCCESS,
} from '../actions/types';

const initialState = {
  list: {},
  recentOrders: []
}

export default (state = initialState, action) => {
  switch(action.type) {
    case CREATE_ORDER: {
      let list = { ...state.list };
      list[action.payload.customerId] = action.payload.items;
      return { ...state, list };
    }
    case UPDATE_ORDER_BY_CUSTOMER: {
      let list = { ...state.list };
      list[action.payload.customerId] = action.payload.items;
      return { ...state, list }
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
    case GET_RECENT_ORDERS_SUCCESS:
      console.log('payload: ', action.payload);
      return { ...state, recentOrders: action.payload.orders }
    case CHECKOUT_SUCCESS: {
      // delete state.list[action.payload.customer.id];
      return { ...state };
    }
    case CHECKOUT_FAIL: {
      return state;
    }
    default: 
      return state;
  }
};
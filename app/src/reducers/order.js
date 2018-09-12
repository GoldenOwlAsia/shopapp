import {
  CREATE_ORDER,
  REMOVE_ITEM,
  INCREASE_ITEM_QUANTITY,
  DECREASE_ITEM_QUANTITY,
  CHECKOUT_SUCCESS,
  CHECKOUT_FAIL,
} from '../actions/types';

const initialState = {
  list: {
    '1': [
      {
        name: 'Product 1',
        quantity: 1,
        price: 300,
        image: 'http://www.gravityimprint.com/images/large/nike%20shoes%20for%20men-436oip.jpg',
      },
      {
        name: 'Product 1',
        quantity: 1,
        price: 300,
        image: 'http://www.gravityimprint.com/images/large/nike%20shoes%20for%20men-436oip.jpg',
      },
      {
        name: 'Product 1',
        quantity: 1,
        price: 300,
        image: 'http://www.gravityimprint.com/images/large/nike%20shoes%20for%20men-436oip.jpg',
      }
    ],
    '2': [
      {
        name: 'Product 1',
        quantity: 1,
        price: 300,
        image: 'http://www.gravityimprint.com/images/large/nike%20shoes%20for%20men-436oip.jpg',
      },
      {
        name: 'Product 1',
        quantity: 3,
        price: 300,
        image: 'http://www.gravityimprint.com/images/large/nike%20shoes%20for%20men-436oip.jpg',
      },{
        name: 'Product 1',
        quantity: 2,
        price: 300,
        image: 'http://www.gravityimprint.com/images/large/nike%20shoes%20for%20men-436oip.jpg',
      },
      {
        name: 'Product 1',
        quantity: 1,
        price: 300,
        image: 'http://www.gravityimprint.com/images/large/nike%20shoes%20for%20men-436oip.jpg',
      }
    ],
    '3': [
      {
        name: 'Product 1',
        quantity: 5,
        price: 300,
        image: 'http://www.gravityimprint.com/images/large/nike%20shoes%20for%20men-436oip.jpg',
      }
    ],
    '4': [
      {
        name: 'Product 1',
        quantity: 5,
        price: 300,
        image: 'http://www.gravityimprint.com/images/large/nike%20shoes%20for%20men-436oip.jpg',
      }
    ],
    '5': [
      {
        name: 'Product 1',
        quantity: 5,
        price: 300,
        image: 'http://www.gravityimprint.com/images/large/nike%20shoes%20for%20men-436oip.jpg',
      }
    ],
    '6': [
      {
        name: 'Product 1',
        quantity: 5,
        price: 300,
        image: 'http://www.gravityimprint.com/images/large/nike%20shoes%20for%20men-436oip.jpg',
      }
    ],
    '7': [
      {
        name: 'Product 1',
        quantity: 5,
        price: 300,
        image: 'http://www.gravityimprint.com/images/large/nike%20shoes%20for%20men-436oip.jpg',
      }
    ],
    '8': [
      {
        name: 'Product 1',
        quantity: 5,
        price: 300,
        image: 'http://www.gravityimprint.com/images/large/nike%20shoes%20for%20men-436oip.jpg',
      }
    ],
    '9': [
      {
        name: 'Product 1',
        quantity: 5,
        price: 300,
        image: 'http://www.gravityimprint.com/images/large/nike%20shoes%20for%20men-436oip.jpg',
      }
    ],
    '10': [
      {
        name: 'Product 1',
        quantity: 5,
        price: 300,
        image: 'http://www.gravityimprint.com/images/large/nike%20shoes%20for%20men-436oip.jpg',
      }
    ]
  },
}

export default (state = initialState, action) => {
  switch(action.type) {
    case CREATE_ORDER: {
      let list = { ...state.list };
      list[action.payload.customerId] = action.payload.items;
      return { ...state, list };
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
      delete state.list[action.payload.customer.id];
      return { ...state };
    }
    case CHECKOUT_FAIL: {
      return state;
    }
    default: 
      return state;
  }
};
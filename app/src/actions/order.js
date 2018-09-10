import {
  CREATE_ORDER, REMOVE_ITEM, INCREASE_ITEM_QUANTITY, DECREASE_ITEM_QUANTITY
} from './types';

const handleCreateOrder = (customerId, items) => {
  return {
    type: CREATE_ORDER,
    payload: {
      customerId,
      items
    }
  }
}

export const createOrder = (customerId, items) => {
  return (dispatch, getState) => {
    dispatch(handleCreateOrder(customerId, items));
  }
}

const handleRemoveItemFromOrder = (customerId, itemId) => {
  return {
    type: REMOVE_ITEM,
    payload: {
      customerId,
      itemId
    }
  }
}

export const removeItemFormOrder = (customerId, itemId) => {
  return (dispatch, getState) => {
    dispatch(handleRemoveItemFromOrder(customerId, itemId));
  }
}

const handleIncreaseItemQuantity = (customerId, itemId) => {
  return {
    type: INCREASE_ITEM_QUANTITY,
    payload: {
      customerId,
      itemId
    }
  }
}

export const increaseItemQuantity = (customerId, itemId) => {
  return (dispatch, getState) => {
    return dispatch(handleIncreaseItemQuantity(customerId, itemId));
  }
}

const handleDecreaseItemQuantity = (customerId, itemId) => {
  return {
    type: DECREASE_ITEM_QUANTITY,
    payload: {
      customerId,
      itemId
    }
  }
}

export const decreaseItemQuantity = (customerId, itemId) => {
  return (dispatch, getState) => {
    return dispatch(handleDecreaseItemQuantity(customerId, itemId));
  }
}
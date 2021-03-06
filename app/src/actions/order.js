import {
  CREATE_ORDER, REMOVE_ITEM, INCREASE_ITEM_QUANTITY, DECREASE_ITEM_QUANTITY,
  CHECKOUT, CHECKOUT_SUCCESS, CHECKOUT_FAIL, UPDATE_ORDER_BY_CUSTOMER,
  LOAD_RECENT_ORDER,
  LOAD_RECENT_ORDER_SUCCESS,
  LOAD_RECENT_ORDER_FAILED,
} from './types';

import client from '../lib/client';
import { Checkout, RecentOrders } from '../lib/queries';

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

export const removeItemFromOrder = (customerId, itemId) => {
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

const handleCheckout = (params) => dispatch => {
  return client
    .mutate({
      mutation: Checkout,
      variables: {
        ...params
      }
    })
    .then(response => {
      const order = response.data.checkout;
      return dispatch(checkoutSuccess(order));
    })
    .catch(error => {
      return dispatch(checkoutFail(error));
    });
}

export const checkout = (params) => {
  return (dispatch, getState) => {
    return dispatch(handleCheckout(params));
  }
}

const handleCheckoutSuccess = (params) => {
  return {
    type: CHECKOUT_SUCCESS,
    payload: { ...params }
  }
}

export const checkoutSuccess = (params) => {
  return (dispatch, getState) => {
    return dispatch(handleCheckoutSuccess(params));
  }
}

const handleCheckoutFail = (params) => {
  return {
    type: CHECKOUT_FAIL,
    payload: params,
  }
}

export const checkoutFail = (params) => {
  return (dispatch, getState) => {
    return dispatch(handleCheckoutFail(params));
  }
}

const handleUpdateOrderByCustomer = (customerId, items) => {
  return {
    type: UPDATE_ORDER_BY_CUSTOMER,
    payload: {
      customerId,
      items
    }
  }
}

export const updateOrderByCustomer = (customerId, items) => {
  return (dispatch, getState) => {
    return dispatch(handleUpdateOrderByCustomer(customerId, items));
  }
}

export const fetchRecentOrders = () => async(dispatch) => {
  try{
    dispatch({
      type: LOAD_RECENT_ORDER,
    });

    const response = await client.query({ query: RecentOrders });
    if(response && response.data && response.data.recentOrders){
      dispatch({
        type: LOAD_RECENT_ORDER_SUCCESS,
        orders: response.data.recentOrders,
      });
    }
  }catch(error){
    dispatch({
      type: LOAD_RECENT_ORDER_FAILED,
      error: error.message,
    });
  }
}
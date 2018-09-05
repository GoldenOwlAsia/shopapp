import {
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL
} from './types';

import client from '../lib/client';
import { GetAllProducts } from '../lib/queries';

const handleGetProducts = (page) => dispatch => {
  return client
    .query({
      query: GetAllProducts,
    })
    .then(response => {
      const products = response.data.products;
      return dispatch(getProductsSuccess(products));
    })
    .catch(error => {
      console.log('get product error:  ', error);
      return dispatch(getProductsFail(error));
    });
}

export const getAllProducts = (page) => {
  return (dispatch, getState) => {
    return dispatch(handleGetProducts(page));
  };
};

const handleGetProductsSuccess = (payload) => {
  return {
    type: GET_PRODUCTS_SUCCESS,
    payload
  }
}

export const getProductsSuccess = (response) => {
  return (dispatch, getState) => {
    return dispatch(handleGetProductsSuccess(response));
  }
}

const handleGetProductsFail = (payload) => {
  return {
    type: GET_PRODUCTS_FAIL,
    payload
  }
}

export const getProductsFail = (response) => {
  return (dispatch, getState) => {
    return dispatch(handleGetProductsFail(response));
  }
}
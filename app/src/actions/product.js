import {
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
  CREATE_PRODUCTS_SUCCESS,
} from './types';

import client from '../lib/client';
import { GetAllProducts, CreateProduct, GetAllCategories } from '../lib/queries';
import { showAppLoading, hideAppLoading, showAppError } from './app';

const handleGetProducts = (page) => dispatch => {
  dispatch(startGetProducts());
  return client
    .query({
      query: GetAllProducts,
      fetchPolicy: 'network-only',
    })
    .then(response => {
      const products = response.data.products;
      return dispatch(getProductsSuccess(products));
    })
    .catch(error => {
      dispatch(showAppError(error));
      /**
       * if you handle getProductsFail, please remove  showAppError
       */
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

const handleStartGetProduct = (payload) => {
  return {
    type: GET_PRODUCTS,
  }
}

export const startGetProducts = () => {
  return (dispatch) => {
    return dispatch(handleStartGetProduct());
  }
}

export const getCategories = () => (dispatch) => {
  dispatch(showAppLoading());
  return client
    .query({
      query: GetAllCategories,
      fetchPolicy: 'network-only',
    })
    .then(response => {
      dispatch(hideAppLoading());
      const { data } = response;
      if(data){
        const { getCategories } = data;
        if(getCategories){
          return getCategories.map(item => ({ value: item }));
        }else {
          return [];
        }
      }else {
        dispatch(showAppError('Lấy danh sách loại sản phẩm thất bại.'));
      }
    })
    .catch(error => {
      dispatch(hideAppLoading());
      dispatch(showAppError(error.message));
    });
}

export const createProductSuccess = (product) => ({
  type: CREATE_PRODUCTS_SUCCESS,
  payload: product,
})

export const handleCreateProduct = (product) => dispatch => {
  dispatch(showAppLoading());
  return client
    .mutate({
      mutation: CreateProduct,
      variables: {
        ...product,
      }
    })
    .then(response => {
      dispatch(hideAppLoading());
      const { data } = response;
      if(data){
        const { createProduct } = data;
        if(createProduct){
          dispatch(createProductSuccess(createProduct))
          return createProduct;
        }
      }else {
        dispatch(showAppError('Tạo sản phẩm thất bại.'));
      }
    })
    .catch(error => {
      dispatch(hideAppLoading());
      dispatch(showAppError(error.message));
    });
}
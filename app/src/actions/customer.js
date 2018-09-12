import {
  CREATE_CUSTOMER,
  CREATE_CUSTOMER_SUCCESS,
  CREATE_CUSTOMER_FAIL,
  CLEAR_SELECTED_CUSTOMER
} from './types';

import client from '../lib/client';
import { CreateCustomer } from '../lib/queries';

const handleCreateCustomer = (name, phoneNumber) => dispatch => {
  return client
    .mutate({
      mutation: CreateCustomer,
      variables: {
        name,
        phoneNumber
      }
    })
    .then(response => {
      const customer = response.data.createCustomer;
      return dispatch(createCustomerSuccess(customer));
    })
    .catch(error => {
      console.log('create customer error:  ', error);
      return dispatch(createCustomerFail(error));
    });
}

export const createCustomer = (name, phoneNumber) => {
  return (dispatch, getState) => {
    return dispatch(handleCreateCustomer(name, phoneNumber));
  };
};

const handleCreateCustomerSuccess = (payload) => {
  return {
    type: CREATE_CUSTOMER_SUCCESS,
    payload
  }
}

export const createCustomerSuccess = (response) => {
  return (dispatch, getState) => {
    return dispatch(handleCreateCustomerSuccess(response));
  }
}

const handleCreateCustomerFail = (payload) => {
  return {
    type: CREATE_CUSTOMER_FAIL,
    payload
  }
}

export const createCustomerFail = (response) => {
  return (dispatch, getState) => {
    return dispatch(handleCreateCustomerFail(response));
  }
}

const handleClearSelectedCustomer = () => {
  return {
    type: CLEAR_SELECTED_CUSTOMER
  }
}

export const clearSelectedCustoemr = () => {
  return (dispatch, getState) => {
    return dispatch(handleClearSelectedCustomer());
  }
}
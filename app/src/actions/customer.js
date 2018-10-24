import {
  CREATE_CUSTOMER,
  CREATE_CUSTOMER_SUCCESS,
  CREATE_CUSTOMER_FAIL,
  CLEAR_SELECTED_CUSTOMER,
  CHANGE_SELECTED_CUSTOMER,
  UPDATE_CUSTOMER_SUCCESS,
  UPDATE_CUSTOMER_FAIL
} from './types';

import client from '../lib/client';
import { CreateCustomer, UpdateCustomer } from '../lib/queries';

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

const handleUpdateCustomer = (params) => dispatch => {
  return client
    .mutate({
      mutation: UpdateCustomer,
      variables: {
        ...params
      }
    })
    .then(response => {
      const customer = response.data.updateCustomer;
      return dispatch(updateCustomerSuccess(customer));
    })
    .catch(error => {
      return dispatch(updateCustomerFail(error));
    });
}

export const updateCustomer = (params) => {
  return (dispatch, getState) => {
    return dispatch(handleUpdateCustomer(params));
  }
}

const handleUpdateCustomerSuccess = (params) => {
  return {
    type: UPDATE_CUSTOMER_SUCCESS,
    payload: {
      ...params
    }
  }
}

export const updateCustomerSuccess = (params) => {
  return (dispatch, getState) => {
    return dispatch(handleUpdateCustomerSuccess(params));
  }
}

const handleUpdateCustomerFail = (error) => {
  return {
    type: UPDATE_CUSTOMER_FAIL,
    papyload: {
      error
    }
  }
}

export const updateCustomerFail = (error) => {
  return (dispatch, getState) => {
    return dispatch(handleUpdateCustomerFail(error));
  }
}

const handleClearSelectedCustomer = () => {
  return {
    type: CLEAR_SELECTED_CUSTOMER
  }
}

export const clearSelectedCustomer = () => {
  return (dispatch, getState) => {
    return dispatch(handleClearSelectedCustomer());
  }
}

const handleChangeSelectedCustomer = (customerId) => {
  return {
    type: CHANGE_SELECTED_CUSTOMER,
    payload: {
      customerId
    }
  }
}

export const changeSelectedCustomer = (customerId) => {
  return (dispatch, getState) => {
    return dispatch(handleChangeSelectedCustomer(customerId))
  }
}
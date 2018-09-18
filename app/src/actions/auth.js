// import { AUTH_SUCCESS, AUTH_FAIL } from './types';
import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  OWNER_LOGIN_SUCCESS
} from './types';

import client from '../lib/client';
import { Login, OwnerLogin } from '../lib/queries';

const handleLogin = (username, password) => dispatch => {
  return client
    .mutate({
      mutation: Login,
      variables: {
        username: username,
        password: password
      }
    })
    .then(response => {
      const authToken = response.data.login.authToken;
      return dispatch(loginSuccess({ authToken }));
    })
    .catch(error => {
      return dispatch(loginFail(error));
    });

}

export const login = (username, password) => {
  return (dispatch, getState) => {
    return dispatch(handleLogin(username, password));
  };
};

const handleLoginSuccess = (payload) => {
  return {
    type: LOGIN_SUCCESS,
    payload
  }
}

export const loginSuccess = (response) => {
  return (dispatch, getState) => {
    return dispatch(handleLoginSuccess(response));
  }
}

const handleLoginFail = (payload) => {
  return {
    type: LOGIN_FAIL,
    payload
  }
}

export const loginFail = (response) => {
  return (dispatch, getState) => {
    return dispatch(handleLoginFail(response));
  }
}

const handleOwnerLogin = ({ code }) => dispatch => {
  console.log('come here???');
  return client
    .mutate({
      mutation: OwnerLogin,
      variables: {
        code
      }
    })
    .then(response => {
      const authToken = response.data.ownerLogin.authToken;
      return dispatch(ownerLoginSuccess({ authToken, isOwner: true }));
    })
    .catch(error => {
      console.log('owner login error: ', error);
      return dispatch(loginFail(error));
    });
}

export const ownerLogin = (params) => {
  return (dispatch, getState) => {
    return dispatch(handleOwnerLogin(params));
  }
}

const handleOwnerLoginSuccess = ({ authToken, isOwner }) => {
  return {
    type: OWNER_LOGIN_SUCCESS,
    payload: {
      authToken,
      isOwner
    }
  }
}

export const ownerLoginSuccess = (params) => {
  return (dispatch, getState) => {
    return dispatch(handleOwnerLoginSuccess(params));
  }
}
import {
  LOADING_USER,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILED,
  UPDATING_USER,
  UPDATE_USER_FAILED,
  UPDATE_USER_SUCCESS,
  CREATING_USER,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILED,
} from './types';

import { showAppError, showAppLoading, hideAppLoading } from './app';
import client from '../lib/client';
import { GetUserById, UpdateUserById, CreateUser } from '../lib/queries/user';


export const loadingUser = () => ({
  type: LOADING_USER,
});

export const loadUserFailed = (error) => ({
  type: LOAD_USER_FAILED,
  error,
});

export const loadUserSuccess = (user) => ({
  type: LOAD_USER_SUCCESS,
  user,
});

export const getUserFromApi = (userId) => async (dispatch) => {
  dispatch(loadingUser());
  try{
    const response = await client.query({
      query: GetUserById,
      variables: {
        userId,
      }
    });
    const { data } = response;
    if(data){
      const { getUserById } = data;
      dispatch(loadUserSuccess(getUserById));
    }
  }catch(error){
    console.log('[user.js] getUserFromApi error', error);
    dispatch(loadUserFailed(error.message));
  }
}

export const updatingUser = () => ({
  type: UPDATING_USER,
});

export const updateUserFailed = (error) => ({
  type: UPDATE_USER_FAILED,
  error,
});

export const updateUserSuccess = (user) => ({
  type: UPDATE_USER_SUCCESS,
  user,
});

export const updateUserFromApi = (userId, params) => async (dispatch) => {
  dispatch(showAppLoading());
  dispatch(updatingUser());
  delete params.__typename;
  try{
    const response = await client.mutate({
      mutation: UpdateUserById,
      variables: {
        userId,
        params,
      }
    });
    dispatch(hideAppLoading());
    const { data } = response;
    console.log('update user success', data);
    if(data){
      const { updateUserById } = data;
      dispatch(updateUserSuccess(updateUserById));
      return data;
    }
  }catch(error){
    dispatch(hideAppLoading());
    dispatch(showAppError({
      message: error.message,
    }));
    console.log('[user.js] updateUserFromApi error', error);
    dispatch(updateUserFailed(error.message));
  }
}

export const creatingUser = () => ({
  type: CREATING_USER,
});

export const createUserFailed = (error) => ({
  type: CREATE_USER_FAILED,
  error,
});

export const createUserSuccess = (user) => ({
  type: CREATE_USER_SUCCESS,
  user,
});

export const createUserFromApi = (params) => async (dispatch) => {
  dispatch(showAppLoading());
  dispatch(creatingUser());
  delete params.__typename;
  // params.dateOfBirth = new Date().toDateString();
  console.log('[create user.js] params', params)

  try {
    const response = await client.mutate({
      mutation: CreateUser,
      variables: {
        ...params,
      }
    });
    dispatch(hideAppLoading());
    const { data } = response;
    console.log('create user success', data);
    if(data){
      const { createUser } = data;
      dispatch(createUserSuccess(createUser));
      return data;
    }
  }catch(error){
    dispatch(hideAppLoading());
    dispatch(showAppError({
      message: error.message,
    }));
    console.log('[user.js] updateUserFromApi error', error);
    dispatch(createUserFailed(error.message));
  }
}
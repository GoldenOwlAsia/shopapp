import {
  LOADING_USER,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILED,
  UPDATING_USER,
  UPDATE_USER_FAILED,
  UPDATE_USER_SUCCESS,
} from './types';

import client from '../lib/client';
import { GetUserById, UpdateUserById } from '../lib/queries/user';


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
    const { data } = response;
    if(data){
      const { updateUserById } = data;
      dispatch(updateUserSuccess(updateUserById));
    }
  }catch(error){
    console.log('[user.js] updateUserFromApi error', error);
    dispatch(updateUserFailed(error.message));
  }
}
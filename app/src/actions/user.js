import {
  LOADING_USER,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILED,
} from './types';

import client from '../lib/client';
import { GetUserById } from '../lib/queries/user';


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
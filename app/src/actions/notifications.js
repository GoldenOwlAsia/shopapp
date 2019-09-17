import {
  LOAD_NOTIFICATIONS_SUCCESS
} from './types';
import { showAppLoading, hideAppLoading, showAppError } from './app';
import client from '../lib/client';
import { GetNotifications } from '../lib/queries';

export const loadNotificationsSuccess = (notifications) => ({
  type: LOAD_NOTIFICATIONS_SUCCESS,
  notifications,
})

export const getNotifications = () => async (dispatch) => {
  dispatch(showAppLoading());
  try{
    const response = await client.query({ query: GetNotifications});
    dispatch(hideAppLoading());
    if(response.data && response.data.notifications){
      dispatch(loadNotificationsSuccess(response.data.notifications));
    }else {
      dispatch(showAppError(response.message));
    }
  }catch(error){
    dispatch(hideAppLoading());
    dispatch(showAppError(error.message));
  }
}
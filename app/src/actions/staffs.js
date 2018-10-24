import {
  LOADING_STAFFS,
  LOAD_STAFFS_SUCCESS,
  LOAD_STAFFS_FAILED,
} from './types';

import client from '../lib/client';
import { GetAllStaffs } from '../lib/queries/staffs';


export const loadingStaffs = () => ({
  type: LOADING_STAFFS,
});

export const loadStaffsFailed = (error) => ({
  type: LOAD_STAFFS_FAILED,
  error,
});

export const loadStaffsSuccess = (staffs) => ({
  type: LOAD_STAFFS_SUCCESS,
  staffs,
});

export const getStaffsFromApi = () => async (dispatch) => {
  dispatch(loadingStaffs());
  try{
    const response = await client.query({
      query: GetAllStaffs,
      fetchPolicy: 'network-only',
    });
    const { data } = response;
    if(data){
      const { getStaffs } = data;
      dispatch(loadStaffsSuccess(getStaffs || []));
    }
  }catch(error){
    dispatch(loadStaffsFailed(error.message));
  }
}
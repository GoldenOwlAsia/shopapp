import {
  LOAD_CHART_DATA,
  LOAD_CHART_DATA_SUCCESS,
  LOAD_CHART_DATA_FAILED,
  CHART_TYPE,
} from './types';

import client from '../lib/client';
import { ReportDaily, ReportWeekly, ReportMonthly } from '../lib/queries';

const loadChartData = () => ({
  type: LOAD_CHART_DATA,
})

const loadChartDataSuccess = (type, data) => ({
  type: LOAD_CHART_DATA_SUCCESS,
  payload: {
    type,
    data,
  }
})

const loadChartDataFailed = (error) => ({
  type: LOAD_CHART_DATA_FAILED,
  error,
})

export const fetchDailyReport = () => async(dispatch) => {
  try{
    dispatch(loadChartData())
    const response = await client.query({ query: ReportDaily });
    if(response && response.data && response.data.reportByDay){
      const reportByDay = response.data.reportByDay;
      const reports = JSON.parse(reportByDay);
      const data = Object.keys(reports).map(function(key) {
        return { x: key, y: reports[key] };
      });

      dispatch(loadChartDataSuccess(
        CHART_TYPE.DAILY,
        data,
      )) 
    }
  }catch(error){
    dispatch(loadChartDataFailed(error.message));
  }
}

export const fetchWeeklyReport = () => async(dispatch) => {
  try{
    dispatch(loadChartData())
    const response = await client.query({ query: ReportWeekly });
    if(response && response.data && response.data.reportByWeek){
      const reportByWeek = response.data.reportByWeek;
      const reports = JSON.parse(reportByWeek);
      const data = Object.keys(reports).map(function(key) {
        return { x: key, y: reports[key] };
      });

      dispatch(loadChartDataSuccess(
        CHART_TYPE.WEEKLY,
        data,
      )) 
    }
  }catch(error){
    dispatch(loadChartDataFailed(error.message));
  }
}

export const fetchMonthlyReport = () => async(dispatch) => {
  try{
    dispatch(loadChartData())
    const response = await client.query({ query: ReportMonthly });
    if(response && response.data && response.data.reportByMonth){
      const reportByMonth = response.data.reportByMonth;
      const reports = JSON.parse(reportByMonth);
      const data = Object.keys(reports).map(function(key) {
        return { x: key, y: reports[key] };
      });

      dispatch(loadChartDataSuccess(
        CHART_TYPE.MONTHLY,
        data,
      )) 
    }
  }catch(error){
    dispatch(loadChartDataFailed(error.message));
  }
}
import {
  LOAD_CHART_DATA,
  LOAD_CHART_DATA_SUCCESS,
  LOAD_CHART_DATA_FAILED,
  CHART_TYPE,
} from '../actions/types';

const initialState = {
  loading: false,
  error: null,
  [CHART_TYPE.DAILY]: [],
  [CHART_TYPE.WEEKLY]: [],
  [CHART_TYPE.MONTHLY]: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CHART_DATA:
      return {
        ...state,
        loading: true,
      }
    case LOAD_CHART_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        [action.payload.type]: action.payload.data,
      }
    case LOAD_CHART_DATA_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    default:
      return state
  }
};
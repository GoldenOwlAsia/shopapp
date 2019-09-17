// AUTH
const AUTH_PREFIX = 'AUTH.';
export const LOGIN = `${AUTH_PREFIX}LOGIN`;
export const LOGIN_SUCCESS = `${AUTH_PREFIX}LOGIN_SUCCESS`;
export const OWNER_LOGIN_SUCCESS = `${AUTH_PREFIX}OWNER_LOGIN_SUCCESS`;
export const LOGIN_FAIL = `${AUTH_PREFIX}LOGIN_FAIL`;
export const LOG_OUT = `${AUTH_PREFIX}LOG_OUT`;

// PRODUCT
const PRODUCT_PREFIX = 'PRODUCT.';
export const GET_PRODUCTS = `${PRODUCT_PREFIX}GET_PRODUCTS`;
export const GET_PRODUCTS_SUCCESS =`${PRODUCT_PREFIX}GET_PRODUCTS_SUCCESS`;
export const GET_PRODUCTS_FAIL = `${PRODUCT_PREFIX}GET_PRODUCTS_FAILS`;
export const CREATE_PRODUCTS_SUCCESS = `${PRODUCT_PREFIX}CREATE_PRODUCTS_SUCCESS`;

// CUSTOMER
const CUSTOMER_PREFIX = 'CUSTOMER.';
export const CREATE_CUSTOMER = `${CUSTOMER_PREFIX}CREATE_CUSTOMER`;
export const CREATE_CUSTOMER_SUCCESS = `${CUSTOMER_PREFIX}CREATE_CUSTOMER_SUCCESS`;
export const CREATE_CUSTOMER_FAIL = `${CUSTOMER_PREFIX}CREATE_CUSTOMER_FAIL`;
export const CLEAR_SELECTED_CUSTOMER = `${CUSTOMER_PREFIX}CLEAR_SELECTED_CUSTOMER`;
export const CHANGE_SELECTED_CUSTOMER = `${CUSTOMER_PREFIX}CHANGE_SELECTED_CUSTOMER`;
export const UPDATE_CUSTOMER = `${CUSTOMER_PREFIX}UPDATE_CUSTOMER`;
export const UPDATE_CUSTOMER_SUCCESS = `${CUSTOMER_PREFIX}UPDATE_CUSTOMER_SUCCESS`;
export const UPDATE_CUSTOMER_FAIL = `${CUSTOMER_PREFIX}UPDATE_CUSTOMER_FAIL`;
export const REMOVE_CUSTOMER = `${CUSTOMER_PREFIX}REMOVE_CUSTOMER`;

// ORDER
const ORDER_PREFIX = 'ORDER.';
export const CREATE_ORDER = `${ORDER_PREFIX}CREATE_ORDER`;
export const REMOVE_ITEM = `${ORDER_PREFIX}REMOVE_ITEM`;
export const INCREASE_ITEM_QUANTITY = `${ORDER_PREFIX}INCREASE_ITEM_QUANTITY`;
export const DECREASE_ITEM_QUANTITY = `${ORDER_PREFIX}DECREASE_ITEM_QUANTITY`;
export const CHECKOUT = `${ORDER_PREFIX}CHECKOUT`;
export const CHECKOUT_SUCCESS = `${ORDER_PREFIX}CHECKOUT_SUCCESS`;
export const CHECKOUT_FAIL = `${ORDER_PREFIX}CHECKOUT_FAIL`;
export const UPDATE_ORDER_BY_CUSTOMER = `${ORDER_PREFIX}UPDATE_ORDER_BY_CUSTOMER`;
export const LOAD_RECENT_ORDER = `${ORDER_PREFIX}LOAD_RECENT_ORDER`;
export const LOAD_RECENT_ORDER_SUCCESS = `${ORDER_PREFIX}LOAD_RECENT_ORDER_SUCCESS`;
export const LOAD_RECENT_ORDER_FAILED = `${ORDER_PREFIX}LOAD_RECENT_ORDER_FAILED`;

//APP
const APP_PREFIX = 'APP.';
export const TOGGLE_LIST_PRODUCT = `${APP_PREFIX}TOGGLE_LIST_PRODUCT`;
export const SHOW_APP_LOADING = `${APP_PREFIX}SHOW_APP_LOADING`;
export const HIDE_APP_LOADING = `${APP_PREFIX}HIDE_APP_LOADING`;
export const SHOW_APP_ERROR = `${APP_PREFIX}SHOW_APP_ERROR`;
export const HIDE_APP_ERROR = `${APP_PREFIX}HIDE_APP_ERROR`;

//STAFFS
const STAFFS_PREFIX = 'STAFFS.';
export const LOADING_STAFFS = `${STAFFS_PREFIX}LOADING_STAFFS`;
export const LOAD_STAFFS_SUCCESS = `${STAFFS_PREFIX}LOAD_STAFFS_SUCCESS`;
export const LOAD_STAFFS_FAILED = `${STAFFS_PREFIX}LOAD_STAFFS_FAILED`;

//USER
const USER_PREFIX = 'USER.';
export const LOADING_USER = `${USER_PREFIX}LOADING_USER`;
export const LOAD_USER_SUCCESS = `${USER_PREFIX}LOAD_USER_SUCCESS`;
export const LOAD_USER_FAILED = `${USER_PREFIX}LOAD_USER_FAILED`;
export const UPDATING_USER = `${USER_PREFIX}UPDATING_USER`;
export const UPDATE_USER_FAILED = `${USER_PREFIX}UPDATE_USER_FAILED`;
export const UPDATE_USER_SUCCESS = `${USER_PREFIX}UPDATE_USER_SUCCESS`;
export const CREATING_USER = `${USER_PREFIX}CREATING_USER`;
export const CREATE_USER_FAILED = `${USER_PREFIX}CREATE_USER_FAILED`;
export const CREATE_USER_SUCCESS = `${USER_PREFIX}CREATE_USER_SUCCESS`;

//NOTIFICATION
const NOTIFICATION_PREFIX = 'NOTIFICATION.';
export const LOAD_NOTIFICATIONS_SUCCESS = `${NOTIFICATION_PREFIX}LOAD_NOTIFICATIONS_SUCCESS`;

//CHART
const CHART = 'CHART.';
export const LOAD_CHART_DATA = `${CHART}LOAD_CHART_DATA`;
export const LOAD_CHART_DATA_SUCCESS = `${CHART}LOAD_CHART_DATA_SUCCESS`;
export const LOAD_CHART_DATA_FAILED = `${CHART}LOAD_CHART_DATA_FAILED`;
export const CHART_TYPE = {
  DAILY: `${CHART}DAILY`,
  WEEKLY: `${CHART}WEEKLY`,
  MONTHLY: `${CHART}MONTHLY`,
}
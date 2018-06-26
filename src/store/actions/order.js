// import * as actionTypes from './actionTypes';
import {
  action,
  ORDERS,
  REQUEST,
  SUCCESS,
  FAILURE,
  PURCHASE_BURGER,
  PURCHASE_INIT
} from './actionTypes';

// export const purchaseBurgerSuccess = (id, orderData) => ({
//   type: actionTypes.PURCHASE_BURGER_SUCCESS,
//   orderId: id,
//   orderData: orderData
// });

// export const purchaseBurgerFail = error => ({
//   type: actionTypes.PURCHASE_BURGER_FAIL,
//   error
// });

// export const purchaseBurgerStart = (orderData, token) => ({
//   type: actionTypes.PURCHASE_BURGER_START,
//   orderData,
//   token
// });

// export const purchaseInit = () => ({
//   type: actionTypes.PURCHASE_INIT
// });

// export const fetchOrdersSuccess = orders => ({
//   type: actionTypes.FETCH_ORDERS_SUCCESS,
//   orders
// });

// export const fetchOrdersFail = error => ({
//   type: actionTypes.FETCH_ORDERS_FAIL,
//   error
// });

// export const fetchOrdersStart = (token, userId) => ({
//   type: actionTypes.FETCH_ORDERS_START,
//   token,
//   userId
// });

export const order = {
  purchaseBurgerSuccess: (id, orderData) =>
    action(PURCHASE_BURGER[SUCCESS], id, orderData),
  purchaseBurgerFail: error => action(PURCHASE_BURGER[FAILURE], error),
  purchaseBurgerStart: (orderData, token) =>
    action(PURCHASE_BURGER[REQUEST], orderData, token),
  purchaseInit: () => action(PURCHASE_INIT),
  fetchOrdersStart: (token, userId) => action(ORDERS[REQUEST], token, userId),
  fetchOrdersSuccess: orders => action(ORDERS[SUCCESS], orders),
  fetchOrdersFail: error => action(ORDERS[FAILURE], error)
};

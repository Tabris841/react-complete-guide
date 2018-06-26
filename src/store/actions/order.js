import {
  action,
  ORDERS,
  REQUEST,
  SUCCESS,
  FAILURE,
  PURCHASE_BURGER,
  PURCHASE_INIT
} from './actionTypes';

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

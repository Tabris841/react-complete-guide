import {
  PURCHASE_BURGER,
  REQUEST,
  SUCCESS,
  FAILURE,
  PURCHASE_INIT,
  ORDERS
} from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  orders: [],
  loading: false,
  purchased: false
};

const purchaseInit = (state, action) => {
  return updateObject(state, { purchased: false });
};

const purchaseBurgerStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const purchaseBurgerSuccess = (state, action) => {
  const newOrder = updateObject(action.orderData, { id: action.orderId });
  return updateObject(state, {
    loading: false,
    purchased: true,
    orders: state.orders.concat(newOrder)
  });
};

const purchaseBurgerFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const fetchOrdersStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchOrdersSuccess = (state, action) => {
  return updateObject(state, {
    orders: action.orders,
    loading: false
  });
};

const fetchOrdersFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case PURCHASE_INIT:
      return purchaseInit(state, action);
    case PURCHASE_INIT[REQUEST]:
      return purchaseBurgerStart(state, action);
    case PURCHASE_INIT[SUCCESS]:
      return purchaseBurgerSuccess(state, action);
    case PURCHASE_BURGER[FAILURE]:
      return purchaseBurgerFail(state, action);
    case ORDERS[REQUEST]:
      return fetchOrdersStart(state, action);
    case ORDERS[SUCCESS]:
      return fetchOrdersSuccess(state, action);
    case ORDERS[FAILURE]:
      return fetchOrdersFail(state, action);
    default:
      return state;
  }
};

export default reducer;

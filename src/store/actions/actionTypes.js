export const REQUEST = 'REQUEST';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';

function createRequestTypes(base) {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    acc[type] = `${base}_${type}`;
    return acc;
  }, {});
}

export function action(type, payload = {}) {
  return { type, ...payload };
}

export const AUTH = createRequestTypes('AUTH');
export const AUTH_LOGOUT = 'AUTH_LOGOUT';
export const AUTH_CHECK_STATE = 'AUTH_CHECK_STATE';
export const SET_AUTH_REDIRECT_PATH = 'SET_AUTH_REDIRECT_PATH';

export const ORDERS = createRequestTypes('ORDERS');

export const PURCHASE_BURGER = createRequestTypes('PURCHASE_BURGER');
export const PURCHASE_INIT = 'PURCHASE_INIT';

export const INGREDIENTS = createRequestTypes('INGREDIENTS');
export const INGREDIENT_ADD = 'INGREDIENT_ADD';
export const INGREDIENT_REMOVE = 'INGREDIENT_REMOVE';

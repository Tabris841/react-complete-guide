// export const ADD_INGREDIENT = 'ADD_INGREDIENT';
// export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
// export const SET_INGREDIENTS = 'SET_INGREDIENTS';
// export const FETCH_INGREDIENTS = 'FETCH_INGREDIENTS';
// export const FETCH_INGREDIENTS_FAILED = 'FETCH_INGREDIENTS_FAILED';

// export const PURCHASE_BURGER_START = 'PURCHASE_BURGER_START';
// export const PURCHASE_BURGER_SUCCESS = 'PURCHASE_BURGER_SUCCESS';
// export const PURCHASE_BURGER_FAIL = 'PURCHASE_BURGER_FAIL';
// export const PURCHASE_INIT = 'PURCHASE_INIT';

// export const FETCH_ORDERS_START = 'FETCH_ORDERS_START';
// export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS';
// export const FETCH_ORDERS_FAIL = 'FETCH_ORDERS_FAIL';

// export const AUTH_START = 'AUTH_START';
// export const AUTH_SUCCESS = 'AUTH_SUCCESS';
// export const AUTH_FAIL = 'AUTH_FAIL';
// export const AUTH_LOGOUT = 'AUTH_LOGOUT';
// export const AUTH_CHECK_STATE = 'AUTH_CHECK_STATE';

// export const SET_AUTH_REDIRECT_PATH = 'SET_AUTH_REDIRECT_PATH';

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

import { put, call, fork, all, takeEvery, delay } from 'redux-saga/effects';

import {
  auth,
  order,
  burgerBuilder,
  REQUEST,
  AUTH,
  SUCCESS,
  AUTH_CHECK_STATE,
  INGREDIENTS,
  ORDERS,
  PURCHASE_BURGER
} from '../store/actions';
import {
  fetchUser,
  fetchIngredients,
  saveOrder,
  fetchOrders
} from '../services';

/***************************** Subroutines ************************************/

function* loadUser({ email, password, isSignup }) {
  const authData = {
    email: email,
    password: password,
    returnSecureToken: true
  };

  const { response, error } = yield call(fetchUser, isSignup, authData);

  if (response) {
    yield put(
      auth.success({
        token: response.idToken,
        userId: response.localId,
        expiresIn: response.expiresIn
      })
    );
    yield delay(response.expiresIn * 1000);
    yield put(auth.logout);
  } else {
    yield put(auth.failure(error.response.data.error));
  }
}

function* authCheckState() {
  const token = localStorage.getItem('token');
  if (!token) {
    yield put(auth.logout);
  } else {
    const expirationDate = new Date(localStorage.getItem('expirationDate'));
    if (expirationDate <= new Date()) {
      yield put(auth.logout);
    } else {
      const userId = localStorage.getItem('userId');
      yield put({ type: AUTH[SUCCESS], token, userId });
      yield delay((expirationDate.getTime() - new Date().getTime()) / 1000);
      yield put(auth.logout);
    }
  }
}

function* loadIngredients() {
  const { response } = yield call(fetchIngredients);
  if (response) {
    yield put(burgerBuilder.setIngredients(response));
  } else {
    yield put(burgerBuilder.fetchIngredientsFailed);
  }
}

function* purchaseBurger({ orderData, token }) {
  console.log(arguments);
  const { response, error } = yield call(saveOrder, orderData, token);
  if (response) {
    debugger;
    yield put(order.purchaseBurgerSuccess(response.name, orderData));
  } else {
    yield put(order.purchaseBurgerFail, error);
  }
}

function* loadOrders({ token, userId }) {
  const { response, error } = yield call(fetchOrders, token, userId);
  if (response) {
    yield put(order.fetchOrdersSuccess(response));
  } else {
    yield put(order.fetchOrdersFail, error);
  }
}

/******************************************************************************/
/******************************* WATCHERS *************************************/
/******************************************************************************/

function* watchAuth() {
  yield takeEvery(AUTH[REQUEST], loadUser);
}

function* watchAuthState() {
  yield takeEvery(AUTH_CHECK_STATE, authCheckState);
}

function* watchBurgerBuilder() {
  yield takeEvery(INGREDIENTS[REQUEST], loadIngredients);
}

function* watchPurchaseBurger() {
  yield takeEvery(PURCHASE_BURGER[REQUEST], purchaseBurger);
}

function* watchFetchOrders() {
  yield takeEvery(ORDERS[REQUEST], loadOrders);
}

export default function* root() {
  yield all([
    fork(watchAuth),
    fork(watchBurgerBuilder),
    fork(watchAuthState),
    fork(watchPurchaseBurger),
    fork(watchFetchOrders)
  ]);
}

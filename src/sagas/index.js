import { put, call, fork, all, takeEvery, delay } from 'redux-saga/effects';

import * as actionTypes from '../store/actions/actionTypes';
import { auth } from '../store/actions/auth';
import {
  fetchUser,
  fetchIngredients,
  saveOrder,
  fetchOrders
} from '../services';
import { REQUEST, AUTH, SUCCESS, AUTH_CHECK_STATE } from './actionTypes';

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
    yield put(actions.setIngredients(response));
  } else {
    yield put(actions.fetchIngredientsFailed);
  }
}

function* purchaseBurger({ orderData, token }) {
  const { response, error } = yield call(saveOrder, orderData, token);
  if (response) {
    yield put(actions.purchaseBurgerSuccess(response.name, orderData));
  } else {
    yield put(actions.purchaseBurgerFail, error);
  }
}

function* loadOrders({ token, userId }) {
  const { response, error } = yield call(fetchOrders, token, userId);
  if (response) {
    yield put(actions.fetchOrdersSuccess(response));
  } else {
    yield put(actions.fetchOrdersFail, error);
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
  yield takeEvery(actionTypes.FETCH_INGREDIENTS, loadIngredients);
}

function* watchPurchaseBurger() {
  yield takeEvery(actionTypes.PURCHASE_BURGER_START, purchaseBurger);
}

function* watchFetchOrders() {
  yield takeEvery(actionTypes.FETCH_ORDERS_START, loadOrders);
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

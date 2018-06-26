import { put, call, fork, all, takeEvery, delay } from 'redux-saga/effects';

import * as actionTypes from '../store/actions/actionTypes';
import * as actions from '../store/actions';
import { fetchUser, fetchIngredients } from '../services';

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
      actions.authSuccess({
        token: response.idToken,
        userId: response.localId,
        expiresIn: response.expiresIn
      })
    );
    yield delay(response.expiresIn * 1000);
    yield put(actions.logout);
  } else {
    yield put(actions.authFail(error.response.data.error));
  }
}

function* authCheckState() {
  const token = localStorage.getItem('token');
  if (!token) {
    yield put(actions.logout);
  } else {
    const expirationDate = new Date(localStorage.getItem('expirationDate'));
    if (expirationDate <= new Date()) {
      yield put(actions.logout);
    } else {
      const userId = localStorage.getItem('userId');
      yield put({ type: actionTypes.AUTH_SUCCESS, token, userId });
      yield delay((expirationDate.getTime() - new Date().getTime()) / 1000);
      yield put(actions.logout);
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

/******************************************************************************/
/******************************* WATCHERS *************************************/
/******************************************************************************/

function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_START, loadUser);
}

function* watchAuthState() {
  yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckState);
}

function* watchBurgerBuilder() {
  yield takeEvery(actionTypes.FETCH_INGREDIENTS, loadIngredients);
}

export default function* root() {
  yield all([fork(watchAuth), fork(watchBurgerBuilder), fork(watchAuthState)]);
}

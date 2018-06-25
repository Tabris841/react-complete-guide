import { take, put, call, fork, select, all } from 'redux-saga/effects';
import axios from 'axios';

import * as actionTypes from '../store/actions/actionTypes';
import { authSuccess, checkAuthTimeout, authFail } from '../store/actions';

function getUser(url, authData) {
  return axios
    .post(url, authData)
    .then(response => {
      const expirationDate = new Date(
        new Date().getTime() + response.data.expiresIn * 1000
      );
      localStorage.setItem('token', response.data.idToken);
      localStorage.setItem('expirationDate', expirationDate);
      localStorage.setItem('userId', response.data.localId);
      return { response };
    })
    .catch(error => {
      return { error };
    });
}

function* requestUser({ email, password, isSignup }) {
  const authData = {
    email: email,
    password: password,
    returnSecureToken: true
  };
  let url =
    'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAPKcOlhXKdL_kNbEukYtIiw5AriB02Aac';
  if (!isSignup) {
    url =
      'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAPKcOlhXKdL_kNbEukYtIiw5AriB02Aac';
  }
  const { response, error } = yield call(getUser, url, authData);
  if (response) {
    yield put(authSuccess(response.data.idToken, response.data.localId));
    yield put(checkAuthTimeout(response.data.expiresIn));
  } else {
    yield put(authFail(error.response.data.error));
  }
}

function* watchAuth() {
  while (true) {
    const { email, password, isSignup } = yield take(actionTypes.AUTH_START);
    yield fork(requestUser, { email, password, isSignup });
  }
}

export default function* root() {
  yield all([fork(watchAuth)]);
}

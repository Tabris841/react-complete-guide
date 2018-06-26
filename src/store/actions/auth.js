import * as actionTypes from './actionTypes';

export const authStart = (email, password, isSignup) => ({
  type: actionTypes.AUTH_START,
  email,
  password,
  isSignup
});

export const authSuccess = ({ token, userId, expiresIn }) => {
  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  localStorage.setItem('token', token);
  localStorage.setItem('expirationDate', expirationDate);
  localStorage.setItem('userId', userId);
  return { type: actionTypes.AUTH_SUCCESS, token, userId };
};

export const authFail = error => ({
  type: actionTypes.AUTH_FAIL,
  error
});

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const setAuthRedirectPath = path => ({
  type: actionTypes.SET_AUTH_REDIRECT_PATH,
  path: path
});

export const authCheckState = () => ({
  type: actionTypes.AUTH_CHECK_STATE
});

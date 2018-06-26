// import * as actionTypes from './actionTypes';
import {
  action,
  REQUEST,
  AUTH,
  SUCCESS,
  FAILURE,
  AUTH_LOGOUT,
  SET_AUTH_REDIRECT_PATH,
  AUTH_CHECK_STATE
} from './actionTypes';

// export const authStart = (email, password, isSignup) => ({
//   type: actionTypes.AUTH_START,
//   email,
//   password,
//   isSignup
// });

// export const authSuccess = ({ token, userId, expiresIn }) => {
//   const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
//   localStorage.setItem('token', token);
//   localStorage.setItem('expirationDate', expirationDate);
//   localStorage.setItem('userId', userId);
//   return { type: actionTypes.AUTH_SUCCESS, token, userId };
// };

// export const authFail = error => ({
//   type: actionTypes.AUTH_FAIL,
//   error
// });

// export const logout = () => {
//   localStorage.removeItem('token');
//   localStorage.removeItem('expirationDate');
//   localStorage.removeItem('userId');
//   return {
//     type: actionTypes.AUTH_LOGOUT
//   };
// };

// export const setAuthRedirectPath = path => ({
//   type: actionTypes.SET_AUTH_REDIRECT_PATH,
//   path: path
// });

// export const authCheckState = () => ({
//   type: actionTypes.AUTH_CHECK_STATE
// });

export const auth = {
  request: (email, password, isSignup) =>
    action(AUTH[REQUEST], { email, password, isSignup }),
  success: ({ token, userId, expiresIn }) => {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);

    localStorage.setItem('token', token);
    localStorage.setItem('expirationDate', expirationDate);
    localStorage.setItem('userId', userId);

    return action(AUTH[SUCCESS], { token, userId, expiresIn });
  },
  failure: () => action(AUTH[FAILURE]),
  logout: () => action(AUTH_LOGOUT),
  setAuthRedirectPath: path => action(SET_AUTH_REDIRECT_PATH, path),
  authCheckState: () => action(AUTH_CHECK_STATE)
};

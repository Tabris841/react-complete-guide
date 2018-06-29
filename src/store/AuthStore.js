import { types, flow } from 'mobx-state-tree';
import axios from 'axios';

export const AuthStore = types
  .model('AuthStore', {
    token: types.maybe(types.string),
    userId: types.maybe(types.string),
    error: types.maybe(types.string),
    loading: types.boolean,
    authRedirectPath: types.string
  })
  .actions(self => ({
    authStart: flow(function* authStart(email, password, isSignup) {
      self.error = null;
      self.loading = true;

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
      try {
        const response = yield axios.post(url, authData);
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', response.data.localId);
        self.authSuccess(response.data.idToken, response.data.localId);
        setTimeout(() => {
          self.authLogout();
        }, response.data.expiresIn * 1000);
      } catch (e) {
        self.authFail(e.message);
      }
    }),
    authSuccess(token, userId) {
      self.token = token;
      self.userId = userId;
      self.error = null;
      self.loading = false;
    },
    authFail(error) {
      self.error = error;
      self.loading = false;
    },
    authLogout() {
      localStorage.removeItem('token');
      localStorage.removeItem('expirationDate');
      localStorage.removeItem('userId');

      self.token = null;
      self.userId = null;
    },
    setAuthRedirectPath(path) {
      self.authRedirectPath = path;
    },
    authCheckState() {
      const token = localStorage.getItem('token');
      if (!token) {
        self.authLogout();
      } else {
        const expirationDate = new Date(localStorage.getItem('expirationDate'));
        if (expirationDate <= new Date()) {
          self.authLogout();
        } else {
          const userId = localStorage.getItem('userId');
          const expirationTime =
            (expirationDate.getTime() - new Date().getTime()) / 1000;

          self.authSuccess(token, userId);
          setTimeout(() => {
            self.authLogout();
          }, expirationTime);
        }
      }
    }
  }))
  .views(self => ({
    get isAuthenticated() {
      return self.token !== null;
    }
  }));

import axios from 'axios';

const SIGN_UP_URL =
  'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAPKcOlhXKdL_kNbEukYtIiw5AriB02Aac';

const SIGN_IN_URL =
  'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAPKcOlhXKdL_kNbEukYtIiw5AriB02Aac';

export const fetchUser = (isSignup, authData) => {
  let url = isSignup ? SIGN_UP_URL : SIGN_IN_URL;

  return axios
    .post(url, authData)
    .then(response => ({ response: response.data }))
    .catch(error => ({ error }));
};

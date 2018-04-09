import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://reacy-my-burger-55c1c.firebaseio.com'
});

export default instance;

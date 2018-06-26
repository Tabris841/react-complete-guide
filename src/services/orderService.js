import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://reacy-my-burger-55c1c.firebaseio.com'
});

export const fetchIngredients = () =>
  instance
    .get('/ingredients.json')
    .then(response => ({ response: response.data }))
    .catch(error => ({ error }));

export default instance;

import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://reacy-my-burger-55c1c.firebaseio.com'
});

export const fetchIngredients = () =>
  instance
    .get('/ingredients.json')
    .then(response => ({ response: response.data }))
    .catch(error => ({ error }));

export const saveOrder = (orderData, token) =>
  instance
    .post('/orders.json?auth=' + token, orderData)
    .then(response => ({ response: response.data }))
    .catch(error => ({ error }));

export const fetchOrders = (token, userId) => {
  const queryParams =
    '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';

  return instance
    .get('/orders.json' + queryParams)
    .then(response => {
      const fetchedOrders = [];
      for (let key in response.data) {
        fetchedOrders.push({
          ...response.data[key],
          id: key
        });
      }

      return { response: fetchedOrders };
    })
    .catch(error => ({ error }));
};

export default instance;

import { types, flow } from 'mobx-state-tree';
import axios from '../axios-orders';

import OrderModel from '../models/OrderModel';

export const OrderStore = types
  .model('OrderStore', {
    orders: types.array(OrderModel),
    loading: types.boolean,
    purchased: types.boolean
  })
  .actions(self => {
    return {
      purchaseInit() {
        self.purchased = false;
      },
      purchaseBurgerRequest: flow(function* purchaseBurgerRequest(
        orderData,
        token
      ) {
        self.loading = true;
        try {
          const response = yield axios.post(
            '/orders.json?auth=' + token,
            orderData
          );
          self.purchased = true;
          self.orders.push({ ...orderData, id: response.data.name });
        } catch (e) {
          console.log(e);
        } finally {
          self.loading = false;
        }
      }),
      fetchOrders: flow(function* fetchOrders(token, userId) {
        self.loading = true;
        try {
          const queryParams =
            '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
          const response = yield axios.get('/orders.json' + queryParams);

          const fetchedOrders = [];
          for (let key in response.data) {
            fetchedOrders.push({ ...response.data[key], id: key });
          }
          self.orders = fetchedOrders;
        } catch (e) {
          console.log(e);
        } finally {
          self.loading = false;
        }
      })
    };
  });

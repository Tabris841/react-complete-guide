import { types, flow } from 'mobx-state-tree';
import axios from '../axios-orders';

import OrderModel from '../models/OrderModel';

export const OrderStore = types
  .model('OrderStore', {
    orders: types.array(OrderModel),
    loading: types.boolean,
    purchased: types.boolean
  })
  .actions(self => ({
    purchaseInit() {
      self.purchased = false;
    },
    purchaseBurgerStart: flow(function* purchaseBurgerStart(orderData, token) {
      self.loading = true;
      try {
        const response = yield axios.post(
          '/orders.json?auth=' + token,
          orderData
        );
        self.fetchOrdersSuccess(response.data.name, orderData);
      } catch (e) {
        self.purchaseBurgerFail(e.message);
      }
    }),
    purchaseBurgerSuccess(orderId) {
      self.loading = false;
      self.purchased = true;
      self.orders.push({ id: orderId });
    },
    purchaseBurgerFail() {
      self.loading = false;
    },
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
        self.fetchOrdersSuccess(fetchedOrders);
      } catch (e) {
        self.fetchOrdersFail(e);
      }
    }),
    fetchOrdersSuccess(orders) {
      self.orders = orders;
      self.loading = false;
    },
    fetchOrdersFail() {
      self.loading = false;
    }
  }));

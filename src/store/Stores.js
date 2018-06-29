import { types } from 'mobx-state-tree';
import { AuthStore } from './AuthStore';
import { BurgerBuilderStore } from './BurgerBuilderStore';
import { OrderStore } from './OrderStore';

export const Stores = types.model('Store', {
  auth: types.optional(AuthStore, {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
  }),
  burgerBuilder: types.optional(BurgerBuilderStore, {
    ingredients: null,
    totalPrice: 4,
    error: false
  }),
  order: types.optional(OrderStore, {
    orders: [],
    loading: false,
    purchased: false
  })
});

import { types } from 'mobx-state-tree';
import { AuthStore } from './AuthStore';
import { BurgerBuilderStore } from './BurgerBuilderStore';
import { OrderStore } from './OrderStore';

export const Stores = types.model('Store', {
  auth: AuthStore,
  burgerBuilder: BurgerBuilderStore,
  order: OrderStore
});

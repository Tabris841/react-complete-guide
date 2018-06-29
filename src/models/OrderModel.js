import { types } from 'mobx-state-tree';

import OrderDataModel from './OrderDataModel';
import IngredientsModel from './IngredientsModel';

export default types.model({
  ingredients: IngredientsModel,
  price: types.number,
  orderData: OrderDataModel,
  userId: types.string
});

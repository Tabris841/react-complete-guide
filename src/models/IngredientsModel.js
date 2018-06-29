import { types } from 'mobx-state-tree';

export default types.model('Ingredients', {
  salad: types.number,
  bacon: types.number,
  cheese: types.number,
  meat: types.number
});

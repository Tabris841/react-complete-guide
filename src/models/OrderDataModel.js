import { types } from 'mobx-state-tree';

export default types.model({
  country: types.string,
  deliveryMethod: types.string,
  email: types.string,
  name: types.string,
  street: types.string,
  zipCode: types.string
});

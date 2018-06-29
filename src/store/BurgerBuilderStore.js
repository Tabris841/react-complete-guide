import { types, flow } from 'mobx-state-tree';
import axios from '../axios-orders';

import IngredientsModel from '../models/IngredientsModel';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

export const BurgerBuilderStore = types
  .model('BurgerBuilderStore', {
    ingredients: types.maybe(IngredientsModel),
    totalPrice: types.number,
    error: types.boolean
  })
  .actions(self => ({
    addIngredient(ingredientName) {
      self.ingredients[ingredientName] += 1;
      self.totalPrice += INGREDIENT_PRICES[ingredientName];
    },
    removeIngredient(ingredientName) {
      self.ingredients[ingredientName] -= 1;
      self.totalPrice -= INGREDIENT_PRICES[ingredientName];
    },
    setIngredients(ingredients) {
      self.ingredients = ingredients;
      self.error = false;
    },
    fetchIngredientsFailed() {
      self.error = true;
    },
    initIngredients: flow(function* initIngredients() {
      try {
        const response = yield axios.get('/ingredients.json');
        self.setIngredients(response.data);
      } catch (e) {
        self.fetchIngredientsFailed();
      }
    })
  }));

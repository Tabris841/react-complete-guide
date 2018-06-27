import {
  action,
  INGREDIENT_ADD,
  INGREDIENT_REMOVE,
  INGREDIENTS,
  REQUEST,
  SUCCESS,
  FAILURE
} from './actionTypes';

export const burgerBuilder = {
  addIngredient: name => action(INGREDIENT_ADD, { ingredientName: name }),
  removeIngredient: name => action(INGREDIENT_REMOVE, { ingredientName: name }),
  fetchIngredients: () => action(INGREDIENTS[REQUEST]),
  setIngredients: ingredients => action(INGREDIENTS[SUCCESS], { ingredients }),
  fetchIngredientsFailed: () => action(INGREDIENTS[FAILURE])
};

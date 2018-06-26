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
  addIngredient: name => action(INGREDIENT_ADD, name),
  removeIngredient: name => action(INGREDIENT_REMOVE, name),
  fetchIngredients: () => action(INGREDIENTS[REQUEST]),
  setIngredients: ingredients => action(INGREDIENTS[SUCCESS], ingredients),
  fetchIngredientsFailed: () => action(INGREDIENTS[FAILURE])
};

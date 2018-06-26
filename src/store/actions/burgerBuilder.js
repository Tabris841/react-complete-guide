import {
  action,
  INGREDIENT_ADD,
  INGREDIENT_REMOVE,
  INGREDIENTS,
  REQUEST,
  SUCCESS,
  FAILURE
} from './actionTypes';

// export const addIngredient = name => ({
//   type: actionTypes.ADD_INGREDIENT,
//   ingredientName: name
// });

// export const removeIngredient = name => ({
//   type: actionTypes.REMOVE_INGREDIENT,
//   ingredientName: name
// });

// export const setIngredients = ingredients => ({
//   type: actionTypes.SET_INGREDIENTS,
//   ingredients: ingredients
// });

// export const fetchIngredientsFailed = () => ({
//   type: actionTypes.FETCH_INGREDIENTS_FAILED
// });

// export const fetchIngredients = () => ({ type: actionTypes.FETCH_INGREDIENTS });

export const burgerBuilder = {
  addIngredient: name => action(INGREDIENT_ADD, name),
  removeIngredient: name => action(INGREDIENT_REMOVE, name),
  fetchIngredients: () => action(INGREDIENTS[REQUEST]),
  setIngredients: ingredients => action(INGREDIENTS[SUCCESS], ingredients),
  fetchIngredientsFailed: () => action(INGREDIENTS[FAILURE])
};

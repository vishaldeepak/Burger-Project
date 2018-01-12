import * as actionTypes from '../actions/actionTypes'

const initialState = {
  ingredients: null,
  totalPrice: 4.0,
  error: false,
  building: false
}

const INGREDIENT_PRICES = {
  salad: 0.5,
  meat: 1.4,
  cheese: 0.2,
  bacon: 1.8
}

const addIngredients = (state, action) => {
  return {
    ...state,
    ingredients: {
      ...state.ingredients,
      [action.ingredientName]: state.ingredients[action.ingredientName] + 1
    },
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    building: true
  }
}

const removeIngredients = (state, action) => {
  return {
    ...state,
    ingredients: {
      ...state.ingredients,
      [action.ingredientName]: state.ingredients[action.ingredientName] - 1
    },
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
    building: true
  }
}

const setIngredients = (state, action) => {
  return {
    ...state,
    ingredients: action.ingredients,
    error: false,
    totalPrice: 4.0,
    building: false
  }
}

const ingredientsFetchFail = (state) => {
  return {
    ...state,
    error: true
  }
}

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENTS: return addIngredients(state, action)
    case actionTypes.REMOVE_INGREDIENTS: return removeIngredients(state, action)
    case actionTypes.SET_INGREDIENTS: return setIngredients(state, action)
    case actionTypes.INGREDIENTS_FETCH_FAIL: return ingredientsFetchFail(state)
    default: return state;
  }
}

export default reducer;
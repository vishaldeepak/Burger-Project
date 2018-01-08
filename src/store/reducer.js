import * as actionTypes from './actions'

const initialState = {
  ingredients: {
    meat: 0,
    bacon: 0,
    cheese: 0,
    salad: 0
  },
  totalPrice: 4.0
}

const INGREDIENT_PRICES = {
  salad: 0.5,
  meat: 1.4,
  cheese: 0.2,
  bacon: 1.8
}


const reducer = (state=initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
      }
    case actionTypes.REMOVE_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
      }
    default:
      return state;
  }
}

export default reducer;
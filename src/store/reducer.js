import * as actionTypes from './actions'

const initialState = {
  ingredients: null,
  totalPrice: 0.0
}

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_INGREDIENTS:
      return {
        ingredients: action.payload.ingredients,
        totalPrice: action.payload.totalPrice
      }
    default:
      return state;
  }
}

export default reducer;
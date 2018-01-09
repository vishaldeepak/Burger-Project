import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENTS,
    ingredientName: name
  }
}

export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENTS,
    ingredientName: name
  }
}

const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients
  }
}

const setError = () => {
  return {
    type: actionTypes.INGREDIENTS_FETCH_FAIL
  }
}

export const initIngredients = () => {
  return dispatch => {
    axios.get("/ingredients.json")
      .then(response => {
        dispatch(setIngredients(response.data))
      })
      .catch(error => {
        dispatch(setError())
      })
  }
}

import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCC,
    orderId: id,
    orderData: orderData
  }
}

const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  }
}

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  };
}

export const purchaseBurger = (orderData) => {
  return dispatch => {
    dispatch(purchaseBurgerStart())
    axios.post('/orders.json', orderData)
    .then(response => {
        dispatch(purchaseBurgerSuccess(response.data.name, orderData))
    })
    .catch(error => {
        dispatch(purchaseBurgerFail(error))
    })
  }
}
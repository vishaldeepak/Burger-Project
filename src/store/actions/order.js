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

const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  };
}

export const purchaseBurger = (orderData, token) => {
  return dispatch => {
    dispatch(purchaseBurgerStart())
    axios.post('/orders.json?auth=' + token, orderData)
    .then(response => {
        dispatch(purchaseBurgerSuccess(response.data.name, orderData))
    })
    .catch(error => {
        dispatch(purchaseBurgerFail(error))
    })
  }
}

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  }
}

const ordersFetchSucc = (orders) => {
  return {
      type: actionTypes.ORDERS_FETCH_SUCC,
      orders: orders
  }
}

const ordersFetchFail = (error) => {
  return {
      type: actionTypes.ORDERS_FETCH_FAIL,
      error: error
  }
}

const ordersFetchStart = () => {
  return {
    type: actionTypes.ORDERS_FETCH_START
  }
}

export const fetchOrders = (token, userId) => {
  return dispatch => {
    dispatch(ordersFetchStart())
    const params = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios.get("orders.json" + params)
      .then(res => {
        const fetchedOrders = []
        for(let key in res.data){
          fetchedOrders.push({
            ...res.data[key],
            id: key
          })
        }
        dispatch(ordersFetchSucc(fetchedOrders))
      })
      .catch(error => {
        dispatch(ordersFetchFail(error))
      })
  }
}
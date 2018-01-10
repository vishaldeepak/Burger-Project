import * as actionTypes from '../actions/actionTypes'

const initialState = {
  orders: [],
  loading: false,
  purchased: false
}

const purchaseBurgerStart = (state) => {
  return {
    ...state,
    loading: true
  }
}

const purchaseBurgerSucc = (state , action) => {
  const newOrder = {
    ...action.orderData,
    id: action.id
  }
  return {
    ...state,
    loading: false,
    purchased: true,
    orders: state.orders.concat(newOrder)
  }
}

const purhcaseBurgerFail = (state) => {
  return {
    ...state,
    loading: false
  }
}

const purhcaseBurgerInit = (state) => {
  return {
    ...state,
    purchased: false
  }
}

const orderFetchStart = (state) => {
  return {
    ...state,
    loading: true
  }
}

const orderFetchSucc = (state, action) => {
  return {
    ...state,
    loading: false,
    orders: action.orders
  }
}

const orderFetchFail = (state) => {
  return {
    ...state,
    loading: false
  }
}


const reducer = (state=initialState , action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state)
    case actionTypes.PURCHASE_BURGER_SUCC: return purchaseBurgerSucc(state, action)
    case actionTypes.PURCHASE_BURGER_FAIL: return purhcaseBurgerFail(state)
    case actionTypes.PURCHASE_INIT: return purhcaseBurgerInit(state)
    case actionTypes.ORDERS_FETCH_START: return orderFetchStart(state)
    case actionTypes.ORDERS_FETCH_SUCC: return orderFetchSucc(state, action)
    case actionTypes.ORDERS_FETCH_FAIL: return orderFetchFail(state)
    default: return state
  }
}

export default reducer;
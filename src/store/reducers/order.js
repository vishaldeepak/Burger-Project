import * as actionTypes from '../actions/actionTypes'

const initialState = {
  orders: [],
  loading: false,
  purchased: false
}

const reducer = (state=initialState , action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true
      }
    case actionTypes.PURCHASE_BURGER_SUCC:
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
    case actionTypes.PURCHASE_BURGER_FAIL:
      return {
        ...state,
        loading: false
      }
    case actionTypes.PURCHASE_INIT:
      return {
        ...state,
        purchased: false
      }
    case actionTypes.ORDERS_FETCH_START:
      return {
        ...state,
        loading: true
      }
    case actionTypes.ORDERS_FETCH_SUCC:
      return {
        ...state,
        loading: false,
        orders: action.orders
      }
    case actionTypes.ORDERS_FETCH_FAIL:
      return {
        ...state,
        loading: false
      }
    default:
      return state
  }
}

export default reducer;
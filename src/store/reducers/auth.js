import * as action_types from "../actions/actionTypes";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false
}

const authStart = (state) => {
  return {
    ...state,
    error: null,
    loading: true
  }
}

const authFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false
  }
}

const authSuccess = (state, action) => {
  return {
    ...state,
    token: action.idToken,
    userId: action.userId,
    error: null,
    loading: false
  }
}

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case action_types.AUTH_START: return authStart(state)
    case action_types.AUTH_FAIL: return authFail(state, action)
    case action_types.AUTH_SUCCESS: return authSuccess(state, action)
    default: return state;
  }
}

export default reducer;
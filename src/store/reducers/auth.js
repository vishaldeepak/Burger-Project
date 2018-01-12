import * as action_types from "../actions/actionTypes";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  redirectPath: "/"
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

const logout = (state) => {
  return {
    ...state,
    token: null,
    userId: null
  }
}

const setRedirect = (state, action) => {
  return {
    ...state,
    redirectPath: action.path
  }
}

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case action_types.AUTH_START: return authStart(state)
    case action_types.AUTH_FAIL: return authFail(state, action)
    case action_types.AUTH_SUCCESS: return authSuccess(state, action)
    case action_types.AUTH_LOGOUT: return logout(state)
    case action_types.AUTH_REDIRECT: return setRedirect(state, action)
    default: return state;
  }
}

export default reducer;
import reducer from './auth'
import * as action_types from "../actions/actionTypes"

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
      redirectPath: "/"
    })
  })
})
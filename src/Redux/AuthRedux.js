// @flow
import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  authChangePasswordRequest: ['data'],
  authChangePasswordSuccess: null,
  authChangePasswordFailure: ['err'],
  authForgotPasswordRequest: ['data'],
  authForgotPasswordSuccess: null,
  authForgotPasswordFailure: ['err'],
  authRequest: ['data'],
  authSuccess: ['user'],
  authFailure: ['err'],
  authLogout: null,
  authInit: null
})

export const AuthTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: false,
  user: null,
  err: null
})

/* ------------- Reducers ------------- */

// we're attempting to login
export const request = (state: Object) => state.merge({
  fetching: true,
  err: null
})

// we've successfully logged in
export const success = (state: Object, { user }: Object) =>
  state.merge({
    fetching: false,
    err: null,
    user
  })

export const changeSuccess = (state: Object, { user }: Object) =>
  state.merge({
    fetching: false,
    err: null
  })

// we've had a problem logging in
// Possible errors:
// * user pass doesnt match
// * user not registered ?
// * user account not activated ?
// err is string
export const failure = (state: Object, {err}: any) => {
  return state.merge({
    fetching: false,
    err
  })
}

// Set state initial value when user open sign in modal
export const init = (state: Object) => state.merge({
  fetching: false,
  err: null
})

export const logout = (state: Object) => state.merge({ user: null })

/* ------------- Hookup Reducers To Types ------------- */
export const reducer =
  createReducer(INITIAL_STATE, {
    [Types.AUTH_CHANGE_PASSWORD_SUCCESS]: changeSuccess,
    [Types.AUTH_CHANGE_PASSWORD_REQUEST]: request,
    [Types.AUTH_CHANGE_PASSWORD_FAILURE]: failure,
    [Types.AUTH_FORGOT_PASSWORD_SUCCESS]: changeSuccess,
    [Types.AUTH_FORGOT_PASSWORD_REQUEST]: request,
    [Types.AUTH_FORGOT_PASSWORD_FAILURE]: failure,
    [Types.AUTH_SUCCESS]: success,
    [Types.AUTH_REQUEST]: request,
    [Types.AUTH_FAILURE]: failure,
    [Types.AUTH_LOGOUT]: logout,
    [Types.AUTH_INIT]: init
  })

export const isLoggedIn = (state: Object) => state.user !== null

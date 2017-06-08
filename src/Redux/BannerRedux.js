// @flow
import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  bannerRequest: ['data'],
  bannerSuccess: ['payload'],
  bannerServer: ['payload'],
  bannerFailure: null
})

export const BannerTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: false,
  payload: null,
  data: null
})

/* ------------- Reducers ------------- */
// special for SSR
export const server = (state: Object, { payload }: Object) => state
// we're attempting to login
export const request = (state: Object) => state.merge({ fetching: true })

// we've successfully logged in
export const success = (state: Object, { payload }: Object) =>
  state.merge({
    fetching: false,
    payload
  })

// we've had a problem logging in
export const failure = (state: Object) =>
  state.merge({ fetching: false })

let initialState = INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = (initial:any) => {
  if (initial) {
    initialState = initial
  }
  return createReducer(initialState, {
    [Types.BANNER_SUCCESS]: success,
    [Types.BANNER_SERVER]: server,
    [Types.BANNER_REQUEST]: request,
    [Types.BANNER_FAILURE]: failure
  })
}

// @flow

import { combineReducers } from 'redux'
import { reducer as authRedux } from './AuthRedux'
import { reducer as bannerRedux } from './BannerRedux'
import CreateStore from './CreateStore'
import rootSaga from '../Sagas/'

import Immutable from 'seamless-immutable'

export default (initialState:any) => {
  /* ------------- Assemble The Reducers ------------- */
  let rootReducer
  if (!initialState) {
    rootReducer = combineReducers({
      auth: authRedux,
      banner: bannerRedux()
    })
  } else {
    rootReducer = combineReducers({
      auth: authRedux,
      banner: bannerRedux(Immutable(initialState.banner))
    })
  }

  return CreateStore(rootReducer, rootSaga)
}

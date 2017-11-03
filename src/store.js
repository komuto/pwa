import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import komutoApps from './reducers/reducers'

const sagaMiddleware = createSagaMiddleware()
const reduxStore = (initialState) => createStore(komutoApps, initialState, applyMiddleware(sagaMiddleware))
const store = (initialState) => reduxStore(initialState)

export function token () {
  const state = reduxStore.getState()
  return 'Bearer ' + state.user.token
}

export {
  sagaMiddleware,
  store,
  reduxStore
}

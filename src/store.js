import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import komutoApps from './reducers/reducers'

const sagaMiddleware = createSagaMiddleware()
const reduxStore = createStore(komutoApps, applyMiddleware(sagaMiddleware))
const store = () => reduxStore

export function token () {
  const state = reduxStore.getState()
  return 'Bearer ' + state.user.token
}

export {
  sagaMiddleware,
  store,
  reduxStore
}

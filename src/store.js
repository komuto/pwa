import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import komutoApps from './reducers/reducers'
// import dataSaga from './saga/saga'

const sagaMiddleware = createSagaMiddleware()
const store = () => createStore(komutoApps, applyMiddleware(sagaMiddleware))
// sagaMiddleware.run(dataSaga)

export function token () {
  const state = store.getState()
  // return state.user.token
  return 'Bearer ' + state.user.token
}

export {
  sagaMiddleware,
  store
}

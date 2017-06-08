import { not, contains } from 'ramda'
import { createStore, applyMiddleware, compose } from 'redux'
import createLogger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import { autoRehydrate } from 'redux-persist'
import ReduxPersist from '../Config/ReduxPersist'
import AppConfig from '../Config/AppConfig'
import RehydrationServices from '../Services/RehydrationService'

// the logger master switch
const USE_LOGGING = AppConfig.DEBUG

// silence these saga-based messages
const SAGA_LOGGING_BLACKLIST = ['EFFECT_TRIGGERED', 'EFFECT_RESOLVED', 'EFFECT_REJECTED', 'persist/REHYDRATE']

// create the logger
const logger = createLogger({
  predicate: (getState, { type }) => USE_LOGGING && not(contains(type, SAGA_LOGGING_BLACKLIST))
})

const sagaMiddleware = createSagaMiddleware()

exports.sagaMiddleware = sagaMiddleware

let store = null
let enhancers = []
let middleware = []

export default (rootReducer, rootSaga, isServer) => {
  // create the saga middleware
  middleware.push(sagaMiddleware)

  if (USE_LOGGING) {
    middleware.push(logger)
  }

  // add our normal middleware to the list
  enhancers.push(applyMiddleware(...middleware))
  if (ReduxPersist.active) {
    enhancers.push(autoRehydrate())
  }
  // a function which can create our store and auto-persist the data
  // if (!store) {
  store = createStore(rootReducer, compose(...enhancers))
  // }

  if (ReduxPersist.active) {
    RehydrationServices.updateReducers(store, isServer)
  }

  // kick off the root saga
  // sagaMiddleware.run(rootSaga)

  return store
}

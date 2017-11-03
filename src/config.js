import { delay } from 'redux-saga'
import { put, call, select } from 'redux-saga/effects'
import localforage from 'localforage'
import AppConfig from './Config/AppConfig'
export const serviceUrl = AppConfig.serviceUrl
export const apiKomuto = AppConfig.apiKomuto
export const storage = localforage

export function errorHandling (actionType, err) {
  const { problem, status } = err
  switch (problem) {
    case 'CLIENT_ERROR':
      const { data } = err
      data.isOnline = true
      return put({ type: actionType, ...data })
    case 'SERVER_ERROR':
      const errorServer = {
        message: 'Server error!',
        code: status,
        isOnline: true,
        isLoading: false
      }
      return put({ type: actionType, ...errorServer })
    case 'TIMEOUT_ERROR':
      const errorTimeout = {
        message: 'Timeout reached!',
        code: 'ETIMEOUT',
        isOnline: true,
        isLoading: false
      }
      return put({ type: actionType, ...errorTimeout })
    case 'CONNECTION_ERROR':
    case 'NETWORK_ERROR':
      const errorOffline = {
        message: 'Device offline!',
        code: 'EOFFLINE',
        isOnline: false,
        isLoading: false
      }
      return put({ type: actionType, ...errorOffline })
    default:
      const errorUnknown = {
        message: err.message || err.response || err,
        code: 'EUNKNOWN',
        isOnline: true,
        isLoading: false
      }
      return put({ type: actionType, ...errorUnknown })
  }
}

/**
 * Build initial state
 * @param props {object} additional fields
 * @param meta {boolean}
 */
export const buildInitState = (props = {}, meta = false) => {
  const state = {
    message: '',
    status: 0,
    isLoading: false,
    isFound: false,
    isOnline: true
  }
  if (meta) state['meta'] = { page: 0, limit: 10 }
  return Object.keys(props).reduce((state, prop) => {
    return { [prop]: props[prop], ...state }
  }, state)
}

/**
 * Build request state
 * @param state {object} current state
 */
export const reqState = (state = {}) => {
  const res = {
    ...state,
    status: 0,
    isLoading: true,
    isFound: false
  }
  return res
}

/**
 * Build success state
 * @param action {object}
 * @param data {string} Prop name
 */
export const succState = (action, data = '') => {
  const state = {
    message: action.message || '',
    status: action.code || 200,
    isLoading: false,
    isFound: true,
    isOnline: true
  }
  if (action.meta) state.meta = action.meta
  if (data) state[data] = action.data
  return state
}

/**
 * Build failure state
 * @param action {object}
 * @param data {string} Prop name
 * @param value {*} value for the prop
 */
export const failState = (action, data = '', value = false) => {
  const state = {
    message: action.message,
    status: action.code,
    isLoading: false,
    isFound: false,
    isOnline: action.isOnline
  }
  if (data) state[data] = value || ''
  return state
}

export const buildAction = (type, params = false) => {
  if (params) {
    return {
      type,
      ...params
    }
  }
  return { type }
}

/**
 * Build reducer
 * @param state {object}
 * @param action {object}
 * @param type {string}
 * @param name {string} additional field name
 * @param customState {array}
 */
export const buildReducer = (state, action, type, name, customState) => {
  switch (action.type) {
    case typeReq(type):
      return !customState[0] ? reqState(state) : customState[0](state, action)
    case typeSucc(type):
      return !customState[1] ? succState(action, name) : customState[1](state, action)
    case typeFail(type):
      return !customState[2] ? failState(action, name, state[name]) : customState[2](state, action)
    default:
      return state
  }
}

/**
 * Remove toBeRemoved from action type
 * @param type {string}
 */
export const buildType = (type) => {
  const toBeRemoved = ['REQUEST', 'SUCCESS', 'FAILURE']
  type = type.split('_')
  if (!toBeRemoved.includes(type[type.length - 1])) return type.join('_')
  type.splice(type.length - 1, 1)
  return type.join('_')
}

export const typeReq = type => `${type}_REQUEST`
export const typeSucc = type => `${type}_SUCCESS`
export const typeFail = type => `${type}_FAILURE`
export const typeReset = type => `${type}_RESET`
export const typeTemp = type => `${type}_TEMP`

/**
 * Build query string
 * @param params {object}
 */
export const buildQuery = (params) => Object.keys(params)
  .reduce((query, prop) => {
    if (params[prop] === undefined || (typeof params[prop] !== 'number' && params[prop].length === 0)) {
      return query
    }
    if (Array.isArray(params[prop])) {
      // Change from array to string -> [1,2] -> '1,2'
      params[prop] = String(params[prop])
    }
    query.push(`${prop}=${params[prop]}`)
    return query
  }, []).join('&')

/**
 * Build sagas
 * @param callApi {function}
 * @param actionType {string}
 * @param getState {function} Get result from other state
 * @param combine {function} combine getState with api result
 * @param keepParam {function} combine result with params
 */
export const buildSaga = (callApi, actionType, getState = false, combine = false, keepParam = false) => function * ({ type, ...params }) {
  // console.log('type: ', type);
  // console.log('actionType: ', actionType);
  try {
    let res, fromState
    if (getState) {
      fromState = yield select(getState(params))
      res = { data: fromState }
    }
    if (!fromState || combine) {
      const result = yield callApi(params)
      if (!result.ok) throw result
      res = !combine ? result.data : combine(fromState, result.data)
    }
    if (keepParam) res = keepParam(res, params)
    yield put({ type: typeSucc(actionType), ...res })
  } catch (e) {
    yield errorHandling(typeFail(actionType), e)
  }
}

export const buildSagaDelay = (callApi, actionType, delayCount = 200, getState = false, combine = false) => function * ({ type, ...params }) {
  try {
    yield call(delay, delayCount)
    let res, fromState
    if (getState) {
      fromState = yield select(getState(params))
      res = { data: fromState }
    }
    if (!fromState || combine) {
      const result = yield callApi(params)
      if (!result.ok) throw result
      res = !combine ? result.data : combine(fromState, result.data)
    }
    yield put({ type: typeSucc(actionType), ...res })
  } catch (e) {
    yield errorHandling(typeFail(actionType), e)
  }
}

/**
 * Filter update object, field with the value of '$' will not be updated
 * @param obj {object}
 */
export const filterUpdate = obj => Object.keys(obj).reduce((res, prop) => {
  if (obj[prop] === '$') return res
  res[prop] = obj[prop]
  return res
}, {})

const composeReducer = (initState, sagaReducer) => (state = initState, { type, ...data }) => {
  const actionType = buildType(type)
  let resultState = {}
  const check = sagaReducer.some((options) => {
    const { resultName, type: reducerType, add = {}, includeNonSaga, resetPrevState } = options
    const customState = [options.customReqState, options.customSuccState, options.customFailState]
    if (actionType === reducerType) {
      // For _REQUEST/_SUCCESS/_FAILURE action type
      resultState = { ...buildReducer(state, { type, ...data }, actionType, resultName, customState), ...add }
      return true
    }
    if (includeNonSaga) {
      if (type === typeReset(reducerType)) {
        // For _RESET action type
        resultState = initState
        if (resetPrevState) resultState = { ...state, ...resetPrevState }
        return true
      } else if (type === typeTemp(reducerType)) {
        // For _TEMP action type
        resultState = { ...state, ...data }
        return true
      }
    }
    return false
  })
  return check ? resultState : state
}

/**
 * @param initState {object} initial state for this reducer
 */
export const createReducer = (initState) => {
  const reducerTypes = []
  return {
    /**
     * @param options {object}
     * @options resultName {string} prop name for the api result
     * @options type {string} reducer action type
     * @options add {object} other objects to add to the state
     * @options includeNonSaga {boolean} non saga reducer operation [RESET || TEMP]
     * @options resetPrevState {object} change prev state with the provided object
     * @options customReqState {function}
     * @options customSuccState {function}
     * @options customfailState {function}
     */
    addReducer (options) {
      reducerTypes.push(options)
      return this
    },
    run () {
      return composeReducer(initState, reducerTypes)
    }
  }
}

/**
 * Get state from another state
 * @param from {function} state to search
 * @param get {string} amount to get
 * @param match {string/array}
 */
export const getState = ({ from, get, match = 'id' }) => (params) => (state) => {
  let toMatch
  const result = from(state).filter(value => {
    if (!Array.isArray(match)) toMatch = value[match]
    else toMatch = match.reduce((value, prop) => value[prop], value)
    return toMatch === params.id
  })
  if (get === 'all') return result[0] ? result : false
  return result[0]
}

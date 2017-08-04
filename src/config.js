import { put } from 'redux-saga/effects'

export const serviceUrl = 'https://private-f0902d-komuto.apiary-mock.com'
export const apiKomuto = 'https://api.komuto.skyshi.com'

export function errorHandling (actionType, res) {
  const errorOffline = {
    message: 'Your device is offline',
    code: 'ENOENT',
    isOnline: false
  }

  const data = res.response
  if (data !== undefined) {
    if (data.status !== 502) {
      const {data} = res.response
      data.isOnline = true
      return put({ type: actionType, ...data })
    } else {
      let errorBadGateway = {
        message: res.response.statusText,
        code: res.response.status,
        isOnline: true
      }
      return put({ type: actionType, ...errorBadGateway })
    }
  } else {
    return put({ type: actionType, ...errorOffline })
  }
}

/**
 * Build initial state
 * @param props {object} additional fields
 * @param meta {boolean}
 */
export const initState = (props = {}, meta = false) => {
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
 * @param meta {boolean}
 */
export const reqState = (state, meta) => {
  const res = {
    ...state,
    status: 0,
    isLoading: true
  }
  if (meta) res['meta'] = { page: 0, limit: 10 }
  return res
}

/**
 * Build success state
 * @param action {object}
 * @param data {string} Prop name
 */
export const succState = (action, data) => {
  const state = {
    message: action.message,
    status: action.code,
    isLoading: false,
    isFound: true,
    isOnline: true
  }
  if (action.meta) state.meta = action.meta
  if (data) state[data] = action.data
  return state
}

/**
 * Build success state by keeping previous data
 * @param action {object}
 * @param data {string} Prop name
 * @param value {array} previous data
 */
export const succKeepState = (action, data, value) => {
  return {
    ...succState(action),
    [data]: [action.data, ...value]
  }
}

/**
 * Build failure state
 * @param action {object}
 * @param data {string} Prop name
 * @param value {*} value for the prop
 */
export const failState = (action, data, value = false) => {
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
 * @param keep {boolean} Keep previous state
 * @param meta {boolean}
 */
export const buildReducer = (state, action, type, name, keep = false, meta = false) => {
  switch (action.type) {
    case typeReq(type):
      return reqState(state, meta)
    case typeSucc(type):
      return !keep ? succState(action, name) : succKeepState(action, name, state[name])
    case typeFail(type):
      return failState(action, name, state[name])
    default:
      return state
  }
}

/**
 * Remove [REQUEST, SUCCESS, FAILURE] from action type
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

/**
 * Build query string
 * @param params {object}
 * @param take {array} optional ===> array of prop names to take
 */
export const buildQuery = (params, take) => Object.keys(params)
  .reduce((query, prop) => {
    if (take && !take.includes(prop)) return query
    if (Array.isArray(params[prop])) {
      if (params[prop].length === 0) params[prop] = ''
      // Change from array to string -> [1,2] -> '1,2'
      params[prop] = String(params[prop])
    }
    if (params[prop]) query.push(`${prop}=${params[prop]}`)
    return query
  }, []).join('&')

/**
 * Build sagas
 * @param args {[string]} arguments to api
 * ['id', 'code'] take only action.id and action.id as arguments
 * @param callApi {function}
 * @param actionType {string}
 * @param props {[string]} take specific prop for data from api
 * ['user', 'province', 'id'] only take data.user.province.id for data
 */
export const buildSaga = (args, callApi, actionType, props = false) => function * (action) {
  try {
    const params = !args.length > 0 ? action
      : args.reduce((params, prop) => ({ ...params, [prop]: action[prop] }), {})
    const { data } = yield callApi(params)
    if (props) {
      data.data = props.reduce((data, prop) => data[prop] || {}, data.data)
    }
    yield put({ type: typeSucc(actionType), ...data })
  } catch (e) {
    yield errorHandling(typeFail(actionType), e)
  }
}

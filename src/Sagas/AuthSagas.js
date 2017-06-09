import {put, call, take} from 'redux-saga/effects'
import {END} from 'redux-saga'
import AuthActions, {AuthTypes} from '../Redux/AuthRedux'
import localforage from 'localforage'
import validate from '../Config/Validator'
import AuthValidator from '../Validations/Auth'
import {baseListen, baseFetchToken, baseFetchNoToken} from './BaseSaga'
// validator config

// attempts to login
export function * login (api) {
  yield baseListen(AuthTypes.AUTH_REQUEST,
    fetchLoginAPI,
    api)
}
// change password
export function * changePassword (api, getToken) {
  yield baseListen(AuthTypes.AUTH_CHANGE_PASSWORD_REQUEST,
    fetchChangePasswordAPI,
    api,
    getToken
  )
}

// forgot password
export function * forgot (api) {
  yield baseListen(AuthTypes.AUTH_FORGOT_PASSWORD_REQUEST,
    fetchForgotPasswordAPI,
    api)
}

// attempts to logout
export function * logout () {
  let action = yield take(AuthTypes.AUTH_LOGOUT)
  while (action !== END) {
    yield localforage.removeItem('access_token')
    action = yield take(AuthTypes.AUTH_LOGOUT)
  }
}

export function * fetchLoginAPI (api, { data }) {
  const hasError = validate(data, AuthValidator.loginConstraints, {format: 'custom'})
  if (hasError) {
    yield put(AuthActions.authFailure(hasError[0]))
  }
  const res = yield call(api.login, data.email, data.password)
  if (!res.ok) {
    yield put(AuthActions.authFailure('Terjadi kesalahan, ulangi beberapa saat lagi'))
  }
  if (!res.data.error) {
    yield localforage.setItem('access_token', res.data.token)
    yield put(AuthActions.authSuccess(res.data.data))
  } else {
    yield put(AuthActions.authFailure(res.data.message))
  }
}

// change password API
export function * fetchChangePasswordAPI (api, getToken, { data }) {
  const hasError = validate(data, AuthValidator.changePasswordConstraints, {format: 'custom'})
  if (hasError) {
    return yield put(AuthActions.authChangePasswordFailure(hasError[0]))
  } else {
    yield baseFetchToken(api.changePassword,
      data,
      getToken,
      AuthActions.authChangePasswordSuccess,
      AuthActions.authChangePasswordFailure)
  }
}

// forgot password API
export function * fetchForgotPasswordAPI (api, { data }) {
  const hasError = validate(data, AuthValidator.forgotConstraints, {format: 'custom'})
  if (hasError) {
    return yield put(AuthActions.authForgotPasswordFailure(hasError[0]))
  } else {
    yield baseFetchNoToken(api.forgot,
      data.email,
      AuthActions.authForgotPasswordSuccess,
      AuthActions.authForgotPasswordFailure)
  }
}

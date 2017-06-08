import {take, fork, call, put} from 'redux-saga/effects'
import {END} from 'redux-saga'
import AuthActions from './AuthSagas'

export function* baseListen (type, fetchSaga, api, token) {
  let action = yield take(type)
  while (action !== END) {
    if (token) {
      yield fork(fetchSaga, api, token, action)
    } else {
      yield fork(fetchSaga, api, action)
    }
    action = yield take(type)
  }
}

export function* baseFetchToken (api, data, getToken, successAction, failureAction) {
  const token = yield call(getToken)
  if (!token) {
    yield put(AuthActions.authLogout())
  } else {
    const res = yield call(api, token, data)
    if (!res.ok) {
      yield put(failureAction('Terjadi kesalahan, ulangi beberapa saat lagi'))
    }
    if (!res.data.error) {
      yield put(successAction(res.data.data))
    } else {
      yield put(failureAction(res.data.message))
    }
  }
}

export function* baseFetchNoToken (api, data, successAction, failureAction) {
  const res = yield call(api, data)
  if (!res.ok) {
    return yield put(failureAction('Terjadi kesalahan, ulangi beberapa saat lagi'))
  }
  if (!res.data.error) {
    return yield put(successAction(res.data.data))
  } else {
    return yield put(failureAction(res.data.message))
  }
}

export function* baseFetchSideEffectToken (api, data, getToken, successAction, failureAction, sideEffect) {
  const token = yield call(getToken)
  if (!token) {
    return yield put(AuthActions.authLogout())
  } else {
    const res = yield call(api, token, data)
    if (!res.ok) {
      return yield put(failureAction('Terjadi kesalahan, ulangi beberapa saat lagi'))
    }
    if (!res.data.error) {
      return yield fork(sideEffect, api, getToken)
    } else {
      return yield put(failureAction(res.data.message))
    }
  }
}

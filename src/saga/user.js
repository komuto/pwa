import { put } from 'redux-saga/effects'
import * as userActions from '../actions/user'
import * as userApi from '../api/user'

function * register (action) {
  try {
    const {data} = yield userApi.register(action)
    yield put({ type: userActions.USER_REGISTER_SUCCESS, ...data })
  } catch (e) {
    yield put({ type: userActions.USER_REGISTER_FAILURE })
  }
}

function * login (action) {
  try {
    const {data} = yield userApi.login(action)
    yield put({ type: userActions.USER_LOGIN_SUCCESS, ...data })
  } catch (e) {
    yield put({ type: userActions.USER_LOGIN_FAILURE })
  }
}

function * forgetPassword (action) {
  try {
    const {data} = yield userApi.forgetPassword(action)
    yield put({ type: userActions.FORGET_PASSWORD_SUCCESS, ...data })
  } catch (e) {
    yield put({ type: userActions.FORGET_PASSWORD_FAILURE })
  }
}

function * loginSocial (action) {
  try {
    const {data} = yield userApi.loginSocial(action)
    yield put({ type: userActions.LOGIN_SOCIAL_SUCCESS, ...data })
  } catch (e) {
    yield put({ type: userActions.LOGIN_SOCIAL_FAILURE })
  }
}

export {
  login,
  register,
  forgetPassword,
  loginSocial
}

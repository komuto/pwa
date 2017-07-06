import { put } from 'redux-saga/effects'
import * as userActions from '../actions/user'
import * as userApi from '../api/user'
import localForage from 'localforage'
import { errorHandling } from '../config'

function * register (action) {
  try {
    const {data} = yield userApi.register(action)
    yield localForage.setItem('token', data.data.token)
    yield put({ type: userActions.USER_REGISTER_SUCCESS, ...data })
  } catch (e) {
    yield errorHandling(userActions.USER_REGISTER_FAILURE, e)
  }
}

function * login (action) {
  try {
    const {data} = yield userApi.login(action)
    yield localForage.setItem('token', data.data.token)
    yield put({ type: userActions.USER_LOGIN_SUCCESS, ...data })
  } catch (e) {
    yield errorHandling(userActions.USER_LOGIN_FAILURE, e)
  }
}

function * validateToken (action) {
  try {
    const {data} = yield userApi.validateToken(action)
    yield put({ type: userActions.VALIDATE_TOKENFORGETPASSWORD_SUCCESS, ...data })
  } catch (e) {
    yield errorHandling(userActions.VALIDATE_TOKENFORGETPASSWORD_FAILURE, e)
  }
}

function * logout (action) {
  try {
    const data = yield userApi.logout(action)
    yield localForage.removeItem('token')
    yield put({ type: userActions.USER_LOGOUT_SUCCESS, ...data })
  } catch (e) {
    const data = {
      message: 'USER LOGOUT FAILED',
      code: 400
    }
    yield put({ type: userActions.USER_LOGOUT_FAILURE, ...data })
  }
}

function * verify (action) {
  try {
    const {data} = yield userApi.verification(action)
    yield put({ type: userActions.USER_VERIFICATION_SUCCESS, ...data })
  } catch (e) {
    yield errorHandling(userActions.USER_VERIFICATION_FAILURE, e)
  }
}

function * forgetPassword (action) {
  try {
    const {data} = yield userApi.forgetPassword(action)
    yield put({ type: userActions.FORGET_PASSWORD_SUCCESS, ...data })
  } catch (e) {
    yield errorHandling(userActions.FORGET_PASSWORD_FAILURE, e)
  }
}

function * loginSocial (action) {
  try {
    const {data} = yield userApi.loginSocial(action)
    yield localForage.setItem('token', data.data.token)
    yield put({ type: userActions.LOGIN_SOCIAL_SUCCESS, ...data })
  } catch (e) {
    yield errorHandling(userActions.LOGIN_SOCIAL_FAILURE, e)
  }
}

function * newPassword (action) {
  try {
    const {data} = yield userApi.newPassword(action)
    yield put({ type: userActions.USER_NEWPASSWORD_SUCCESS, ...data })
  } catch (e) {
    yield errorHandling(userActions.USER_NEWPASSWORD_FAILURE, e)
  }
}

function * getProfile (action) {
  try {
    const {data} = yield userApi.getProfile(action)
    yield put({ type: userActions.GET_PROFILE_SUCCESS, ...data })
  } catch (e) {
    yield errorHandling(userActions.GET_PROFILE_FAILURE, e)
  }
}

function * updateProfile (action) {
  try {
    const {data} = yield userApi.updateProfile(action)
    yield put({ type: userActions.UPDATE_PROFILE_SUCCESS, ...data })
  } catch (e) {
    console.log(e)
    yield errorHandling(userActions.UPDATE_PROFILE_FAILURE, e)
  }
}

function * getBalance (action) {
  try {
    const {data} = yield userApi.getBalance(action)
    yield put({ type: userActions.USER_BALANCE_SUCCESS, ...data })
  } catch (e) {
    console.log(e)
    yield errorHandling(userActions.USER_BALANCE_FAILURE, e)
  }
}

export {
  login,
  logout,
  register,
  verify,
  validateToken,
  forgetPassword,
  loginSocial,
  newPassword,
  getProfile,
  getBalance,
  updateProfile
}

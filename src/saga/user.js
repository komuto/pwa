import { put } from 'redux-saga/effects'
import * as userActions from '../actions/user'
import * as userApi from '../api/user'
import localForage from 'localforage'

const error = {
  message: 'Your device is offline',
  code: 'ENOENT',
  isOnline: false
}

function * register (action) {
  try {
    const {data} = yield userApi.register(action)
    yield localForage.setItem('token', data.data.token)
    yield put({ type: userActions.USER_REGISTER_SUCCESS, ...data })
  } catch (e) {
    const data = e.response
    if (data !== undefined) {
      const {data} = e.response
      data.isOnline = true
      yield put({ type: userActions.USER_REGISTER_FAILURE, ...data })
    } else {
      yield put({ type: userActions.USER_REGISTER_FAILURE, ...error })
    }
  }
}

function * login (action) {
  try {
    const {data} = yield userApi.login(action)
    yield localForage.setItem('token', data.data.token)
    yield put({ type: userActions.USER_LOGIN_SUCCESS, ...data })
  } catch (e) {
    const data = e.response
    if (data !== undefined) {
      const {data} = e.response
      data.isOnline = true
      yield put({ type: userActions.USER_LOGIN_FAILURE, ...data })
    } else {
      yield put({ type: userActions.USER_LOGIN_FAILURE, ...error })
    }
  }
}

function * validateToken (action) {
  try {
    const {data} = yield userApi.validateToken(action)
    yield put({ type: userActions.VALIDATE_TOKENFORGETPASSWORD_SUCCESS, ...data })
  } catch (e) {
    const data = e.response
    if (data !== undefined) {
      const {data} = e.response
      data.isOnline = true
      yield put({ type: userActions.VALIDATE_TOKENFORGETPASSWORD_FAILURE, ...data })
    } else {
      yield put({ type: userActions.VALIDATE_TOKENFORGETPASSWORD_FAILURE, ...error })
    }
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
    const data = e.response
    if (data !== undefined) {
      const {data} = e.response
      data.isOnline = true
      yield put({ type: userActions.USER_VERIFICATION_FAILURE, ...data })
    } else {
      yield put({ type: userActions.USER_VERIFICATION_FAILURE, ...error })
    }
  }
}

function * forgetPassword (action) {
  try {
    const {data} = yield userApi.forgetPassword(action)
    yield put({ type: userActions.FORGET_PASSWORD_SUCCESS, ...data })
  } catch (e) {
    const data = e.response
    if (data !== undefined) {
      const {data} = e.response
      data.isOnline = true
      yield put({ type: userActions.FORGET_PASSWORD_FAILURE, ...data })
    } else {
      yield put({ type: userActions.FORGET_PASSWORD_FAILURE, ...error })
    }
  }
}

function * loginSocial (action) {
  try {
    const {data} = yield userApi.loginSocial(action)
    yield localForage.setItem('token', data.data.token)
    yield put({ type: userActions.LOGIN_SOCIAL_SUCCESS, ...data })
  } catch (e) {
    const data = e.response
    if (data !== undefined) {
      const {data} = e.response
      data.isOnline = true
      yield put({ type: userActions.LOGIN_SOCIAL_FAILURE, ...data })
    } else {
      yield put({ type: userActions.LOGIN_SOCIAL_FAILURE, ...error })
    }
  }
}

function * newPassword (action) {
  try {
    const {data} = yield userApi.newPassword(action)
    yield put({ type: userActions.USER_NEWPASSWORD_SUCCESS, ...data })
  } catch (e) {
    const data = e.response
    if (data !== undefined) {
      const {data} = e.response
      data.isOnline = true
      yield put({ type: userActions.USER_NEWPASSWORD_FAILURE, ...data })
    } else {
      yield put({ type: userActions.USER_NEWPASSWORD_FAILURE, ...error })
    }
  }
}

function * getProfile (action) {
  try {
    const {data} = yield userApi.getProfile(action)
    yield put({ type: userActions.GET_PROFILE_SUCCESS, ...data })
  } catch (e) {
    const data = e.response
    if (data !== undefined) {
      const {data} = e.response
      data.isOnline = true
      yield put({ type: userActions.GET_PROFILE_FAILURE, ...data })
    } else {
      yield put({ type: userActions.GET_PROFILE_FAILURE, ...error })
    }
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
  getProfile
}

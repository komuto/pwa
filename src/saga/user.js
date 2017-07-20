
import localforage from 'localforage'
import { put } from 'redux-saga/effects'
import * as userActions from '../actions/user'
import * as userApi from '../api/user'
import { errorHandling } from '../config'

function * register (action) {
  try {
    const {data} = yield userApi.register(action)
    yield localforage.setItem('token', data.data.token)
    yield put({ type: userActions.USER_REGISTER_SUCCESS, ...data })
  } catch (e) {
    yield errorHandling(userActions.USER_REGISTER_FAILURE, e)
  }
}

function * login (action) {
  try {
    const {data} = yield userApi.login(action)
    yield localforage.setItem('token', data.data.token)
    yield put({ type: userActions.USER_LOGIN_SUCCESS, ...data })
  } catch (e) {
    yield errorHandling(userActions.USER_LOGIN_FAILURE, e)
  }
}

function* validateToken (action) {
  try {
    const {data} = yield userApi.validateToken(action)
    yield put({ type: userActions.VALIDATE_TOKENFORGETPASSWORD_SUCCESS, ...data })
  } catch (e) {
    yield errorHandling(userActions.VALIDATE_TOKENFORGETPASSWORD_FAILURE, e)
  }
}

function* logout (action) {
  try {
    const data = yield userApi.logout(action)
    yield localforage.removeItem('token')
    yield put({ type: userActions.USER_LOGOUT_SUCCESS, ...data })
  } catch (e) {
    const data = {
      message: 'USER LOGOUT FAILED',
      code: 400
    }
    yield put({ type: userActions.USER_LOGOUT_FAILURE, ...data })
  }
}

function* verify (action) {
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
    yield localforage.setItem('token', data.data.token)
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

function * changePassword (action) {
  try {
    const {data} = yield userApi.changePassword(action)
    yield put({ type: userActions.CHANGE_PASSWORD_SUCCESS, ...data })
  } catch (e) {
    yield errorHandling(userActions.CHANGE_PASSWORD_FAILURE, e)
  }
}

function* getProfile (action) {
  try {
    const {data} = yield userApi.getProfile(action)
    yield put({ type: userActions.GET_PROFILE_SUCCESS, ...data })
  } catch (e) {
    yield errorHandling(userActions.GET_PROFILE_FAILURE, e)
  }
}

function* getProfileManage (action) {
  try {
    const {data} = yield userApi.getProfileManage(action)
    yield put({ type: userActions.GET_PROFILEMANAGE_SUCCESS, ...data })
  } catch (e) {
    yield errorHandling(userActions.GET_PROFILEMANAGE_FAILURE, e)
  }
}

function* getPhone (action) {
  try {
    const {data} = yield userApi.getPhone(action)
    yield put({ type: userActions.GET_PHONE_SUCCESS, ...data })
  } catch (e) {
    yield errorHandling(userActions.GET_PHONE_FAILURE, e)
  }
}

function* updatePhone (action) {
  try {
    const {data} = yield userApi.updatePhone(action)
    yield put({ type: userActions.UPDATE_PHONE_SUCCESS, ...data })
  } catch (e) {
    yield errorHandling(userActions.UPDATE_PHONE_FAILURE, e)
  }
}

function * updateProfile (action) {
  // console.log(action)
  try {
    const {data} = yield userApi.updateProfile(action)
    // console.log(data)
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

function * favoriteStore (action) {
  try {
    const {data} = yield userApi.favoriteStore(action)
    yield put({ type: userActions.FAVORITE_STORE_SUCCESS, ...data })
  } catch (e) {
    yield errorHandling(userActions.FAVORITE_STORE_FAILURE, e)
  }
}

function * addToBucket (action) {
  try {
    const {data} = yield userApi.addToBucket(action)
    yield put({ type: userActions.ADDTO_BUCKET_SUCCESS, ...data })
  } catch (e) {
    yield errorHandling(userActions.ADDTO_BUCKET_FAILURE, e)
  }
}

function * countBucket (action) {
  try {
    const {data} = yield userApi.countBucket(action)
    yield put({ type: userActions.COUNT_BUCKET_SUCCESS, ...data })
  } catch (e) {
    yield errorHandling(userActions.COUNT_BUCKET_FAILURE, e)
  }
}

function * getBucket (action) {
  try {
    const {data} = yield userApi.getBucket(action)
    yield put({ type: userActions.GET_BUCKET_SUCCESS, ...data })
  } catch (e) {
    yield errorHandling(userActions.GET_BUCKET_FAILURE, e)
  }
}

function * getDiscussion (action) {
  try {
    const {data} = yield userApi.getDiscussion(action)
    yield put({ type: userActions.GET_USERDISCUSSION_SUCCESS, ...data })
  } catch (e) {
    yield errorHandling(userActions.GET_USERDISCUSSION_FAILURE, e)
  }
}

function * listFavoriteStore (action) {
  try {
    const {data} = yield userApi.listFavoriteStore(action)
    yield put({ type: userActions.LIST_FAVORITSTORE_SUCCESS, ...data })
  } catch (e) {
    console.log(e)
    yield errorHandling(userActions.LIST_FAVORITSTORE_FAILURE, e)
  }
}

function * sendOTPPhone (action) {
  try {
    const {data} = yield userApi.sendOTPPhone(action)
    yield put({ type: userActions.SEND_PHONEOTP_SUCCESS, ...data })
  } catch (e) {
    yield errorHandling(userActions.SEND_PHONEOTP_FAILURE, e)
  }
}

function * verifyPhone (action) {
  try {
    const {data} = yield userApi.verifyPhone(action)
    yield put({ type: userActions.VERIFIY_PHONE_SUCCESS, ...data })
  } catch (e) {
    yield errorHandling(userActions.VERIFIY_PHONE_FAILURE, e)
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
  changePassword,
  getProfile,
  getProfileManage,
  getBalance,
  getPhone,
  updatePhone,
  updateProfile,
  favoriteStore,
  addToBucket,
  countBucket,
  getBucket,
  getDiscussion,
  listFavoriteStore,
  verifyPhone,
  sendOTPPhone
}

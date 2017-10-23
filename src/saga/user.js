import { put } from 'redux-saga/effects'
import * as actions from '../actions/user'
import * as apis from '../api/user'
import { errorHandling, typeSucc, typeFail, buildSaga, storage } from '../config'

export const register = function * (action) {
  try {
    const result = yield apis.register(action)
    if (!result.ok) throw result
    yield storage.setItem('token', result.data.data.token)
    yield put({ type: typeSucc(actions.USER_REGISTER), ...result.data })
  } catch (e) {
    yield errorHandling(typeFail(actions.USER_REGISTER), e)
  }
}

export const login = function * login (action) {
  try {
    const result = yield apis.login(action)
    if (!result.ok) throw result
    yield storage.setItem('token', result.data.data.token)
    yield put({ type: typeSucc(actions.USER_LOGIN), ...result.data })
  } catch (e) {
    yield errorHandling(typeFail(actions.USER_LOGIN), e)
  }
}

export const logout = function * (action) {
  try {
    const data = yield apis.logout(action)
    yield storage.removeItem('token')
    yield put({ type: typeSucc(actions.USER_LOGOUT), ...data })
  } catch (e) {
    const data = {
      message: 'USER LOGOUT FAILED',
      code: 400
    }
    yield put({ type: typeFail(actions.USER_LOGOUT), ...data })
  }
}

export const loginSocial = function * login (action) {
  try {
    const result = yield apis.loginSocial(action)
    if (!result.ok) throw result
    yield storage.setItem('token', result.data.data.token)
    yield put({ type: typeSucc(actions.LOGIN_SOCIAL), ...result.data })
  } catch (e) {
    yield errorHandling(typeFail(actions.LOGIN_SOCIAL), e)
  }
}

export const validateToken = buildSaga(apis.validateToken, actions.VALIDATE_TOKEN_FORGET_PASSWORD)
export const verify = buildSaga(apis.verification, actions.USER_VERIFICATION)
export const forgetPassword = buildSaga(apis.forgetPassword, actions.FORGET_PASSWORD)
export const newPassword = buildSaga(apis.newPassword, actions.USER_NEW_PASSWORD)
export const changePassword = buildSaga(apis.changePassword, actions.CHANGE_PASSWORD)
export const getProfile = buildSaga(apis.getProfile, actions.GET_PROFILE)
export const getProfileManage = buildSaga(apis.getProfileManage, actions.GET_PROFILE_MANAGE)
export const getPhone = buildSaga(apis.getPhone, actions.GET_PHONE)
export const updatePhone = buildSaga(apis.updatePhone, actions.UPDATE_PHONE)
export const updateProfile = buildSaga(apis.updateProfile, actions.UPDATE_PROFILE)
export const getBalance = buildSaga(apis.getBalance, actions.USER_BALANCE)
export const favoriteStore = buildSaga(apis.favoriteStore, actions.FAVORITE_STORE)
export const getDiscussion = buildSaga(apis.getDiscussion, actions.GET_USER_DISCUSSION)
export const listFavoriteStore = buildSaga(apis.listFavoriteStore, actions.LIST_FAVORIT_STORE)
export const sendOTPPhone = buildSaga(apis.sendOTPPhone, actions.SEND_PHONE_OTP)
export const verifyPhone = buildSaga(apis.verifyPhone, actions.VERIFIY_PHONE)
export const wishlist = buildSaga(apis.wishlist, actions.GET_WISHLIST)
export const sendOTPBank = buildSaga(apis.sendOTPBank, actions.SEND_BANK_OTP)
export const updateFirebaseToken = buildSaga(apis.updateFirebaseToken, actions.UPDATE_FIREBASE_REG_TOKEN)
export const getNotifSettings = buildSaga(apis.getNotifSettings, actions.GET_NOTIF_SETTINGS)
export const updateNotifSettings = buildSaga(apis.updateNotifSettings, actions.UPDATE_NOTIF_SETTINGS)
export const getResolvedResolutions = buildSaga(apis.getResolvedResolutions, actions.GET_RESOLVED_RESOLUTIONS)
export const getUnresolvedResolutions = buildSaga(apis.getUnresolvedResolutions, actions.GET_UNRESOLVED_RESOLUTIONS)
export const getResolutionDetail = buildSaga(apis.getResolutionDetail, actions.GET_RESOLUTION_DETAIL)
export const createResolution = buildSaga(apis.createResolution, actions.CREATE_RESOLUTION)
export const replyResolution = buildSaga(apis.replyResolution, actions.REPLY_RESOLUTION)
export const resendSignup = buildSaga(apis.resendSignup, actions.RESEND_SIGNUP)

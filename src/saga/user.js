import { put } from 'redux-saga/effects'
import * as actions from '../actions/user'
import * as apis from '../api/user'
import localforage from 'localforage'
import { errorHandling, typeSucc, typeFail, buildSaga } from '../config'

export const register = function * (action) {
  try {
    const {data} = yield apis.register(action)
    yield localforage.setItem('token', data.data.token)
    yield put({ type: typeSucc(actions.USER_REGISTER), ...data })
  } catch (e) {
    yield errorHandling(typeFail(actions.USER_REGISTER), e)
  }
}

export const login = function * login (action) {
  try {
    const {data} = yield apis.login(action)
    yield localforage.setItem('token', data.data.token)
    yield put({ type: typeSucc(actions.USER_LOGIN), ...data })
  } catch (e) {
    yield errorHandling(typeFail(actions.USER_LOGIN), e)
  }
}

export const logout = function * (action) {
  try {
    const data = yield apis.logout(action)
    yield localforage.removeItem('token')
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
    const {data} = yield apis.loginSocial(action)
    yield localforage.setItem('token', data.data.token)
    yield put({ type: typeSucc(actions.LOGIN_SOCIAL), ...data })
  } catch (e) {
    yield errorHandling(typeFail(actions.LOGIN_SOCIAL), e)
  }
}

export const validateToken = buildSaga(['token'], apis.validateToken, actions.VALIDATE_TOKEN_FORGET_PASSWORD)
export const verify = buildSaga(['token'], apis.verification, actions.USER_VERIFICATION)
export const forgetPassword = buildSaga(['email'], apis.forgetPassword, actions.FORGET_PASSWORD)
export const newPassword = buildSaga(['token', 'password'], apis.newPassword, actions.USER_NEW_PASSWORD)
export const changePassword = buildSaga([], apis.changePassword, actions.CHANGE_PASSWORD)
export const getProfile = buildSaga([], apis.getProfile, actions.GET_PROFILE)
export const getProfileManage = buildSaga([], apis.getProfileManage, actions.GET_PROFILE_MANAGE)
export const getPhone = buildSaga([], apis.getPhone, actions.GET_PHONE)
export const updatePhone = buildSaga(['phone_number'], apis.updatePhone, actions.UPDATE_PHONE)
export const updateProfile = buildSaga([], apis.updateProfile, actions.UPDATE_PROFILE)
export const getBalance = buildSaga([], apis.getBalance, actions.USER_BALANCE)
export const favoriteStore = buildSaga(['id'], apis.favoriteStore, actions.FAVORITE_STORE)
export const getDiscussion = buildSaga(['page', 'limit'], apis.getDiscussion, actions.GET_USER_DISCUSSION)
export const listFavoriteStore = buildSaga(['page', 'limit'], apis.listFavoriteStore, actions.LIST_FAVORIT_STORE)
export const sendOTPPhone = buildSaga([], apis.sendOTPPhone, actions.SEND_PHONE_OTP)
export const verifyPhone = buildSaga(['code'], apis.verifyPhone, actions.VERIFIY_PHONE)
export const wishlist = buildSaga([], apis.wishlist, actions.GET_WISHLIST)
export const sendOTPBank = buildSaga([], apis.sendOTPBank, actions.SEND_BANK_OTP)

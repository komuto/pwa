import { buildAction, typeReq } from '../config'

export const USER_LOGIN = 'USER_LOGIN'
export const USER_VERIFICATION = 'USER_VERIFICATION'
export const LOGIN_SOCIAL = 'LOGIN_SOCIAL'
export const USER_LOGOUT = 'USER_LOGOUT'
export const USER_REGISTER = 'USER_REGISTER'
export const USER_NEW_PASSWORD = 'USER_NEW_PASSWORD'
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD'
export const FORGET_PASSWORD = 'FORGET_PASSWORD'
export const GET_PROFILE = 'GET_PROFILE'
export const GET_PROFILE_MANAGE = 'GET_PROFILE_MANAGE'
export const UPDATE_PROFILE = 'UPDATE_PROFILE'
export const VALIDATE_TOKEN_FORGET_PASSWORD = 'VALIDATE_TOKEN_FORGET_PASSWORD'
export const USER_BALANCE = 'USER_BALANCE'
export const FAVORITE_STORE = 'FAVORITE_STORE'
export const GET_PHONE = 'GET_PHONE'
export const UPDATE_PHONE = 'UPDATE_PHONE'
export const GET_USER_DISCUSSION = 'GET_USER_DISCUSSION'
export const LIST_FAVORIT_STORE = 'LIST_FAVORIT_STORE'
export const SEND_PHONE_OTP = 'SEND_PHONE_OTP'
export const VERIFIY_PHONE = 'VERIFIY_PHONE'
export const SEND_BANK_OTP = 'SEND_BANK_OTP'
export const IS_LOGIN = 'IS_LOGIN'
export const GET_WISHLIST = 'GET_WISHLIST'

export const register = params => buildAction(typeReq(USER_REGISTER), params)
export const verification = params => buildAction(typeReq(USER_VERIFICATION), params)
export const newPassword = params => buildAction(typeReq(USER_NEW_PASSWORD), params)
export const changePassword = params => buildAction(typeReq(CHANGE_PASSWORD), params)
export const getProfile = params => buildAction(typeReq(GET_PROFILE), params)
export const getProfileManage = () => buildAction(typeReq(GET_PROFILE_MANAGE))
export const login = params => buildAction(typeReq(USER_LOGIN), params)
export const logout = () => buildAction(typeReq(USER_LOGOUT))
export const loginSocial = params => buildAction(typeReq(LOGIN_SOCIAL), params)
export const forgetPassword = params => buildAction(typeReq(FORGET_PASSWORD), params)
export const stateLogin = params => buildAction(IS_LOGIN, params)
export const validateToken = params => buildAction(typeReq(VALIDATE_TOKEN_FORGET_PASSWORD), params)
export const getBalance = () => buildAction(typeReq(USER_BALANCE))
export const updateProfile = params => buildAction(typeReq(UPDATE_PROFILE), params)
export const favoriteStore = params => buildAction(typeReq(FAVORITE_STORE), params)
export const getPhone = () => buildAction(typeReq(GET_PHONE))
export const updatePhone = params => buildAction(typeReq(UPDATE_PHONE), params)
export const getDiscussion = () => buildAction(typeReq(GET_USER_DISCUSSION))
export const listFavorite = params => buildAction(typeReq(LIST_FAVORIT_STORE), params)
export const sendOTPPhone = params => buildAction(typeReq(SEND_PHONE_OTP), params)
export const verifyPhone = params => buildAction(typeReq(VERIFIY_PHONE), params)
export const sendOTPBank = () => buildAction(typeReq(SEND_BANK_OTP))
export const wishlist = () => buildAction(typeReq(GET_WISHLIST))

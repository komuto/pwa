import { buildAction, typeReq, typeTemp } from '../config'

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
export const UPDATE_FIREBASE_REG_TOKEN = 'UPDATE_FIREBASE_REG_TOKEN'
export const GET_NOTIF_SETTINGS = 'GET_NOTIF_SETTINGS'
export const UPDATE_NOTIF_SETTINGS = 'UPDATE_NOTIF_SETTINGS'
export const GET_RESOLVED_RESOLUTIONS = 'GET_RESOLVED_RESOLUTIONS'
export const GET_UNRESOLVED_RESOLUTIONS = 'GET_UNRESOLVED_RESOLUTIONS'
export const GET_RESOLUTION_DETAIL = 'GET_RESOLUTION_DETAIL'
export const CREATE_RESOLUTION = 'CREATE_RESOLUTION'
export const REPLY_RESOLUTION = 'REPLY_RESOLUTION'
export const RESEND_SIGNUP = 'RESEND_SIGNUP'

/**
 * @param params are the same as the api
 * @state register
 */
export const register = params => buildAction(typeReq(USER_REGISTER), params)

/**
 * @params token {string}
 * @state verification
 */
export const verification = params => buildAction(typeReq(USER_VERIFICATION), params)

/**
 * @param params are the same as the api
 * @state newPassword
 */
export const newPassword = params => buildAction(typeReq(USER_NEW_PASSWORD), params)

/**
 * @param params are the same as the api
 * @state changePassword
 */
export const changePassword = params => buildAction(typeReq(CHANGE_PASSWORD), params)

/**
 * @state profile
 */
export const getProfile = () => buildAction(typeReq(GET_PROFILE))

/**
 * @state profile
 */
export const getProfileManage = () => buildAction(typeReq(GET_PROFILE_MANAGE))

/**
 * @param params are the same as the api
 * @state user
 */
export const login = params => buildAction(typeReq(USER_LOGIN), params)

/**
 * @state user
 */
export const logout = () => buildAction(typeReq(USER_LOGOUT))

/**
 * @param params are the same as the api
 * @state user
 */
export const loginSocial = params => buildAction(typeReq(LOGIN_SOCIAL), params)

/**
 * @params email {string}
 * @state forgetPassword
 */
export const forgetPassword = params => buildAction(typeReq(FORGET_PASSWORD), params)

/**
 * @params login {boolean}
 * @state isLogin
 */
export const stateLogin = params => buildAction(typeTemp(IS_LOGIN), params)

/**
 * @params token {string}
 * @state validation
 */
export const validateToken = params => buildAction(typeReq(VALIDATE_TOKEN_FORGET_PASSWORD), params)

/**
 * @state balance
 */
export const getBalance = () => buildAction(typeReq(USER_BALANCE))

/**
 * @param params are the same as the api
 * @state updateProfile
 */
export const updateProfile = params => buildAction(typeReq(UPDATE_PROFILE), params)

/**
 * @params id {int} store id
 * @state favorite
 */
export const favoriteStore = params => buildAction(typeReq(FAVORITE_STORE), params)

/**
 * @state phone
 */
export const getPhone = () => buildAction(typeReq(GET_PHONE))

/**
 * @param params are the same as the api
 * @state updatePhone
 */
export const updatePhone = params => buildAction(typeReq(UPDATE_PHONE), params)

/**
 * @state userDiscussion
 */
export const getDiscussion = params => buildAction(typeReq(GET_USER_DISCUSSION), params)

/**
 * @param params are the same as the api query
 * @state listFavoriteStore
 */
export const listFavorite = params => buildAction(typeReq(LIST_FAVORIT_STORE), params)

/**
 * @state sendOTPPhone
 */
export const sendOTPPhone = () => buildAction(typeReq(SEND_PHONE_OTP))

/**
 * @param params are the same as the api
 * @state verifyPhone
 */
export const verifyPhone = params => buildAction(typeReq(VERIFIY_PHONE), params)

/**
 * @state sendOTPBank
 */
export const sendOTPBank = () => buildAction(typeReq(SEND_BANK_OTP))

/**
 * @params params are the same as the api query
 * @state wishlist
 */
export const wishlist = params => buildAction(typeReq(GET_WISHLIST), params)

/**
 * @param params are the same as the api
 * @state alterUser
 */
export const updateFirebaseToken = params => buildAction(typeReq(UPDATE_FIREBASE_REG_TOKEN), params)

/**
 * @state notifSettings
 */
export const getNotifSettings = () => buildAction(typeReq(GET_NOTIF_SETTINGS))

/**
 * @params params are the same as the api query
 * @state notifSettings
 */
export const updateNotifSettings = params => buildAction(typeReq(UPDATE_NOTIF_SETTINGS), params)

/**
 * @params params are the same as the api query
 * @state resolvedResolutions
 */
export const getResolvedResolutions = params => buildAction(typeReq(GET_RESOLVED_RESOLUTIONS), params)

/**
 * @params params are the same as the api query
 * @state unresolvedResolutions
 */
export const getUnresolvedResolutions = params => buildAction(typeReq(GET_UNRESOLVED_RESOLUTIONS), params)

/**
 * @params id {int} resolution id
 * @state resolutionDetail
 */
export const getResolutionDetail = params => buildAction(typeReq(GET_RESOLUTION_DETAIL), params)

/**
 * @params params are the same as the api
 * @state createResolution
 */
export const createResolution = params => buildAction(typeReq(CREATE_RESOLUTION), params)

/**
 * @params id {int} resolution id
 * @state replyResolution
 */
export const replyResolution = params => buildAction(typeReq(REPLY_RESOLUTION), params)

/**
 * @state alterUser
 */
export const resendSignup = () => buildAction(typeReq(RESEND_SIGNUP))

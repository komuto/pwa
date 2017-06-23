export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST'
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE'

export const USER_VERIFICATION_REQUEST = 'USER_VERIFICATION_REQUEST'
export const USER_VERIFICATION_SUCCESS = 'USER_VERIFICATION_SUCCESS'
export const USER_VERIFICATION_FAILURE = 'USER_VERIFICATION_FAILURE'

export const LOGIN_SOCIAL_REQUEST = 'LOGIN_SOCIAL_REQUEST'
export const LOGIN_SOCIAL_SUCCESS = 'LOGIN_SOCIAL_SUCCESS'
export const LOGIN_SOCIAL_FAILURE = 'LOGIN_SOCIAL_FAILURE'

export const USER_LOGOUT_REQUEST = 'USER_LOGOUT_REQUEST'
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS'
export const USER_LOGOUT_FAILURE = 'USER_LOGOUT_FAILURE'

export const USER_REGISTER_REQUEST = 'USER_REGISTER_REQUEST'
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS'
export const USER_REGISTER_FAILURE = 'USER_REGISTER_FAILURE'

export const USER_NEWPASSWORD_REQUEST = 'USER_NEWPASSWORD_REQUEST'
export const USER_NEWPASSWORD_SUCCESS = 'USER_NEWPASSWORD_SUCCESS'
export const USER_NEWPASSWORD_FAILURE = 'USER_NEWPASSWORD_FAILURE'

export const FORGET_PASSWORD_REQUEST = 'FORGET_PASSWORD_REQUEST'
export const FORGET_PASSWORD_SUCCESS = 'FORGET_PASSWORD_SUCCESS'
export const FORGET_PASSWORD_FAILURE = 'FORGET_PASSWORD_FAILURE'

export const GET_PROFILE_REQUEST = 'GET_PROFILE_REQUEST'
export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS'
export const GET_PROFILE_FAILURE = 'GET_PROFILE_FAILURE'

export const VALIDATE_TOKENFORGETPASSWORD_REQUEST = 'VALIDATE_TOKENFORGETPASSWORD_REQUEST'
export const VALIDATE_TOKENFORGETPASSWORD_SUCCESS = 'VALIDATE_TOKENFORGETPASSWORD_SUCCESS'
export const VALIDATE_TOKENFORGETPASSWORD_FAILURE = 'VALIDATE_TOKENFORGETPASSWORD_FAILURE'

export const IS_LOGIN = 'IS_LOGIN'

function register (params) {
  return {
    type: USER_REGISTER_REQUEST,
    ...params
  }
}

function verification (params) {
  return {
    type: USER_VERIFICATION_REQUEST,
    ...params
  }
}

function newPassword (params) {
  return {
    type: USER_NEWPASSWORD_REQUEST,
    ...params
  }
}

function getProfile (params) {
  return {
    type: GET_PROFILE_REQUEST,
    ...params
  }
}

function login (params = {}) {
  return {
    type: USER_LOGIN_REQUEST,
    ...params
  }
}

function logout () {
  return {
    type: USER_LOGOUT_REQUEST
  }
}

function loginSocial (params = {}) {
  return {
    type: LOGIN_SOCIAL_REQUEST,
    ...params
  }
}

function forgetPassword (params = {}) {
  return {
    type: FORGET_PASSWORD_REQUEST,
    ...params
  }
}

function stateLogin (params) {
  return {
    type: IS_LOGIN,
    ...params
  }
}

function validateToken (params) {
  return {
    type: VALIDATE_TOKENFORGETPASSWORD_REQUEST,
    ...params
  }
}

export {
  register,
  verification,
  login,
  logout,
  newPassword,
  getProfile,
  loginSocial,
  forgetPassword,
  stateLogin,
  validateToken
}

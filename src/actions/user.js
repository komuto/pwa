export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST'
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE'

export const USER_REGISTER_REQUEST = 'USER_REGISTER_REQUEST'
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS'
export const USER_REGISTER_FAILURE = 'USER_REGISTER_FAILURE'

export const FORGET_PASSWORD_REQUEST = 'FORGET_PASSWORD_REQUEST'
export const FORGET_PASSWORD_SUCCESS = 'FORGET_PASSWORD_SUCCESS'
export const FORGET_PASSWORD_FAILURE = 'FORGET_PASSWORD_FAILURE'

function register (params) {
  return {
    type: USER_REGISTER_REQUEST,
    ...params
  }
}

function login (params = {}) {
  console.log('ACTIONS')
  return {
    type: USER_LOGIN_REQUEST,
    ...params
  }
}

function forgetPassword (params = {}) {
  return {
    type: FORGET_PASSWORD_REQUEST,
    ...params
  }
}

export {
  register,
  login,
  forgetPassword
}
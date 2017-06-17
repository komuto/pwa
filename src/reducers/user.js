import * as actions from '../actions/user'

const initUser = {
  email: '',
  token: '',
  uid: '',
  isLoggedIn: false,
  user: {},
  message: '',
  status: ''
}

const initForgetPass = {
  email: '',
  message: '',
  status: ''
}

const initLogin = {
  login: false
}

function auth (state = initUser, action) {
  switch (action.type) {
    case actions.USER_LOGIN_REQUEST:
      return {
        ...state,
        email: action.email,
        token: '',
        uid: 0,
        user: {},
        message: action.message,
        status: action.code
      }
    case actions.USER_LOGIN_SUCCESS:
      return {
        ...state,
        email: action.data.email,
        token: action.data.token,
        uid: action.data.id,
        isLoggedIn: true,
        user: action,
        message: action.message,
        status: action.code
      }
    case actions.USER_LOGIN_FAILURE:
      return {
        ...state,
        email: '',
        token: '',
        uid: 0,
        isLoggedIn: false,
        user: {},
        message: action.message,
        status: action.code
      }
    case actions.USER_NEWPASSWORD_REQUEST:
      return {
        ...state
      }
    case actions.USER_NEWPASSWORD_SUCCESS:
      return {
        ...state,
        email: action.data.email,
        uid: action.data.id,
        isLoggedIn: true,
        user: action,
        message: action.message,
        status: action.code
      }
    case actions.USER_NEWPASSWORD_FAILURE:
      return {
        ...state,
        message: action.message,
        status: action.code
      }
    default:
      return state
  }
}

function authSocial (state = initUser, action) {
  switch (action.type) {
    case actions.LOGIN_SOCIAL_REQUEST:
      return {
        ...state,
        email: action.email,
        token: '',
        uid: 0,
        user: {},
        message: action.message,
        status: action.code
      }
    case actions.LOGIN_SOCIAL_SUCCESS:
      return {
        ...state,
        email: action.data.email,
        token: action.data.token,
        uid: action.data.id,
        isLoggedIn: true,
        user: action,
        message: action.message,
        status: action.code,
        is_required_password: action.data.is_required_password
      }
    case actions.LOGIN_SOCIAL_FAILURE:
      return {
        ...state,
        email: '',
        token: '',
        uid: 0,
        user: {},
        message: action.message,
        status: action.code
      }
    default:
      return state
  }
}
function register (state = initUser, action) {
  switch (action.type) {
    case actions.USER_REGISTER_REQUEST:
      return {
        ...state,
        email: action.email,
        token: '',
        uid: 0,
        isLoggedIn: false,
        isAuthenticated: false,
        user: {},
        message: '',
        status: 0
      }
    case actions.USER_REGISTER_SUCCESS:
      return {
        ...state,
        email: action.data.email,
        uid: action.data.id,
        isLoggedIn: true,
        user: action,
        message: action.message,
        status: action.code
      }
    case actions.USER_REGISTER_FAILURE:
      return {
        ...state,
        email: '',
        token: '',
        uid: 0,
        isLoggedIn: false,
        user: {},
        message: action.message,
        status: action.code
      }
    default:
      return state
  }
}
function forgetPassword (state = initForgetPass, action) {
  switch (action.type) {
    case actions.FORGET_PASSWORD_REQUEST:
      return {
        ...state,
        email: action.email,
        message: '',
        status: ''
      }
    case actions.FORGET_PASSWORD_SUCCESS:
      return {
        ...state,
        message: action.message,
        status: action.code
      }
    case actions.FORGET_PASSWORD_FAILURE:
      return {
        ...state,
        message: action.message,
        status: action.code
      }
    default:
      return state
  }
}

function isLogin (state = initLogin, action) {
  switch (action.type) {
    case actions.IS_LOGIN:
      return {
        ...state,
        login: action.login
      }
    default:
      return state
  }
}

export {
  auth,
  authSocial,
  register,
  forgetPassword,
  isLogin
}

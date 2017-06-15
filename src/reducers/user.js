import * as actions from '../actions/user'

const initUser = {
  email: '',
  token: '',
  uid: '',
  isLoggedIn: false,
  isAuthenticated: false,
  user: {},
  message: '',
  status: ''
}
const initForgetPass = {
  email: '',
  message: '',
  status: ''
}

function auth (state = initUser, action) {
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
    case actions.USER_AUTHENTICATION_REQUEST:
      return {
        ...state
      }
    case actions.USER_AUTHENTICATION_SUCCESS:
      return {
        ...state,
        email: action.user.user.data.email,
        token: action.user.user.data.token,
        uid: action.user.user.data.id,
        isLoggedIn: true,
        user: action,
        message: action.user.user.message,
        status: action.user.user.code,
        isAuthenticated: true
      }
    case actions.USER_AUTHENTICATION_FAILURE:
      return {
        ...state
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

export {
  auth,
  forgetPassword
}

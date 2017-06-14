import * as actions from '../actions/user'

const initUser = {
  email: '',
  token: '',
  uid: '',
  user: {}
}

function auth (state = initUser, action) {
  switch (action.type) {
    case actions.USER_REGISTER_REQUEST:
      return {
        ...state,
        email: action.email,
        token: '',
        uid: 0,
        user: {},
        message: '',
        status: 0
      }
    case actions.USER_REGISTER_SUCCESS:
      return {
        ...state,
        email: action.data.email,
        uid: action.data.id,
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
        user: {},
        message: action.message,
        status: action.code
      }
    case actions.FORGET_PASSWORD_REQUEST:
      return {
        ...state,
        email: action.email,
        token: '',
        uid: 0,
        user: {},
        message: '',
        status: ''
      }
    case actions.FORGET_PASSWORD_SUCCESS:
      return {
        ...state,
        email: action.data.email,
        token: '',
        uid: 0,
        user: {},
        message: action.message,
        status: action.code
      }
    case actions.FORGET_PASSWORD_FAILURE:
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

export {
  auth
}

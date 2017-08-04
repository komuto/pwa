import * as actions from '../actions/user'
import { reqState, succState, failState, typeReq, typeSucc, typeFail, buildReducer, buildType, initState } from '../config'

const initUser = {
  email: '',
  token: '',
  uid: 0,
  user: {},
  ...initState()
}

const initGetBalance = {
  balance: 0,
  ...initState()
}

const initGetPhone = {
  phone: '',
  ...initState()
}

const initProfile = {
  verifyStatus: '',
  user: {},
  ...initState()
}

const initForgetPass = {
  email: '',
  ...initState()
}

const initWishlist = {
  wishlist: [],
  ...initState()
}

const initLogin = {
  login: false
}

function auth (state = initUser, action) {
  switch (action.type) {
    case typeReq(actions.USER_LOGIN):
      return {
        ...initUser,
        email: action.email,
        isLoading: true
      }
    case typeSucc(actions.USER_LOGIN):
      return {
        email: action.data.email,
        token: action.data.token,
        uid: action.data.id,
        user: action.data,
        ...succState(action)
      }
    case typeFail(actions.USER_LOGIN):
      return {
        email: '',
        token: '',
        uid: 0,
        user: {},
        ...failState(action)
      }
    case typeReq(actions.LOGIN_SOCIAL):
      return {
        ...initUser,
        email: action.email,
        isLoading: true
      }
    case typeSucc(actions.LOGIN_SOCIAL):
      return {
        email: action.data.email,
        token: action.data.token,
        uid: action.data.id,
        user: action.data,
        is_required_password: action.data.is_required_password,
        ...succState(action)
      }
    case typeFail(actions.LOGIN_SOCIAL):
      return {
        email: '',
        token: '',
        uid: 0,
        user: {},
        ...failState(action)
      }
    case actions.USER_LOGOUT:
      return {
        ...initUser,
        message: action.message,
        status: action.code,
        isFound: true
      }
    default:
      return state
  }
}

function newPassword (state = initState(), action) {
  const type = buildType(action.type)
  switch (type) {
    case actions.USER_NEW_PASSWORD:
      return buildReducer(state, action, type)
    default:
      return state
  }
}

function verify (state = initState(), action) {
  const type = buildType(action.type)
  switch (type) {
    case actions.USER_VERIFICATION:
      return buildReducer(state, action, type)
    default:
      return state
  }
}

function getProfile (state = initProfile, action) {
  switch (action.type) {
    case typeReq(actions.GET_PROFILE):
      return reqState(state)
    case typeSucc(actions.GET_PROFILE):
      return {
        verifyStatus: action.data.user.status,
        user: action.data,
        ...succState(action)
      }
    case typeFail(actions.GET_PROFILE):
      return {
        ...initProfile,
        ...failState(action)
      }
    case typeReq(actions.GET_PROFILE_MANAGE):
      return reqState(state)
    case typeSucc(actions.GET_PROFILE_MANAGE):
      return {
        verifyStatus: action.data.user.status,
        user: action.data,
        ...succState(action)
      }
    case typeFail(actions.GET_PROFILE_MANAGE):
      return {
        ...initProfile,
        ...failState(action)
      }
    default:
      return state
  }
}

function updateProfile (state = initState(), action) {
  const type = buildType(action.type)
  switch (type) {
    case actions.UPDATE_PROFILE:
      return buildReducer(state, action, type)
    default:
      return state
  }
}

function register (state = initUser, action) {
  switch (action.type) {
    case typeReq(actions.USER_REGISTER):
      return {
        ...initUser,
        email: action.email,
        isLoading: true
      }
    case typeSucc(actions.USER_REGISTER):
      return {
        email: action.data.email,
        uid: action.data.id,
        user: action.data,
        token: action.data.token,
        ...succState(action)
      }
    case typeFail(actions.GET_PROFILE):
      return {
        ...initUser,
        ...failState(action)
      }
    default:
      return state
  }
}

function validateToken (state = initState(), action) {
  const type = buildType(action.type)
  switch (type) {
    case actions.VALIDATE_TOKEN_FORGET_PASSWORD:
      return buildReducer(state, action, type)
    default:
      return state
  }
}

function forgetPassword (state = initForgetPass, action) {
  switch (action.type) {
    case typeReq(actions.FORGET_PASSWORD):
      return {
        ...initForgetPass,
        email: action.email,
        isLoading: true
      }
    case typeSucc(actions.FORGET_PASSWORD):
      return {
        email: state.email,
        ...succState(action)
      }
    case typeFail(actions.FORGET_PASSWORD):
      return {
        email: state.email,
        ...failState(action)
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

function getBalance (state = initGetBalance, action) {
  const type = buildType(action.type)
  switch (type) {
    case actions.USER_BALANCE:
      return buildReducer(state, action, type, 'balance')
    default:
      return state
  }
}

function changePassword (state = initState(), action) {
  const type = buildType(action.type)
  switch (type) {
    case actions.CHANGE_PASSWORD:
      return buildReducer(state, action, type)
    default:
      return state
  }
}

function favoriteStore (state = initState(), action) {
  const type = buildType(action.type)
  switch (type) {
    case actions.FAVORITE_STORE:
      return buildReducer(state, action, type)
    default:
      return state
  }
}

function getPhone (state = initGetPhone, action) {
  switch (action.type) {
    case typeReq(actions.GET_PHONE):
      return reqState(state)
    case typeSucc(actions.GET_PHONE):
      return {
        count: action.data.phone_number,
        ...succState(action)
      }
    case typeFail(actions.COUNT_BUCKET):
      return {
        ...state,
        ...failState(action)
      }
    default:
      return state
  }
}

function updatePhone (state = initState(), action) {
  const type = buildType(action.type)
  switch (type) {
    case actions.UPDATE_PHONE:
      return buildReducer(state, action, type)
    default:
      return state
  }
}

function getDiscussion (state = initState({ discussions: [] }, true), action) {
  const type = buildType(action.type)
  switch (type) {
    case actions.GET_USER_DISCUSSION:
      return buildReducer(state, action, type, 'discussions', false, true)
    default:
      return state
  }
}

function sendOTPPhone (state = initState(), action) {
  const type = buildType(action.type)
  switch (type) {
    case actions.SEND_PHONE_OTP:
      return buildReducer(state, action, type)
    default:
      return state
  }
}

function verifyPhone (state = initState(), action) {
  const type = buildType(action.type)
  switch (type) {
    case actions.VERIFIY_PHONE:
      return buildReducer(state, action, type)
    default:
      return state
  }
}

function wishlist (state = initWishlist, action) {
  const type = buildType(action.type)
  switch (type) {
    case actions.GET_WISHLIST:
      return buildReducer(state, action, type, 'wishlist')
    default:
      return state
  }
}

export const sendOTPBank = (state = initState(), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.SEND_BANK_OTP:
      return buildReducer(state, action, type)
    default:
      return state
  }
}

function listFavoriteStore (state = initState({ stores: [] }, true), action) {
  const type = buildType(action.type)
  switch (type) {
    case actions.LIST_FAVORIT_STORE:
      return buildReducer(state, action, type, 'stores', false, true)
    default:
      return state
  }
}

export {
  auth,
  verify,
  getProfile,
  register,
  newPassword,
  changePassword,
  forgetPassword,
  isLogin,
  validateToken,
  getBalance,
  updateProfile,
  favoriteStore,
  getPhone,
  updatePhone,
  getDiscussion,
  listFavoriteStore,
  sendOTPPhone,
  verifyPhone,
  wishlist
}

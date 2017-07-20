import * as actions from '../actions/user'

const initUser = {
  email: '',
  token: '',
  uid: '',
  user: {},
  message: '',
  status: '',
  isLoading: false,
  isOnline: true,
  isFound: false
}

const initDiscussion = {
  discussions: [],
  message: '',
  status: '',
  isLoading: false,
  isOnline: true,
  isFound: false
}

const initFavoriteStore = {
  stores: [],
  message: '',
  status: '',
  isLoading: false,
  isOnline: true,
  isFound: false
}

const initUpdate = {
  message: '',
  status: 0,
  isLoading: false,
  isFound: false,
  isOnline: true
}

const initBucket = {
  count: 0,
  message: '',
  status: 0,
  isLoading: false,
  isFound: false,
  isOnline: true
}

const initGetBucket = {
  buckets: [],
  message: '',
  status: 0,
  isLoading: false,
  isFound: false,
  isOnline: true
}

const initGetBalance = {
  balance: 0,
  message: '',
  status: 0,
  isLoading: false,
  isFound: false,
  isOnline: true
}

const initGetPhone = {
  phone: '',
  message: '',
  status: 0,
  isLoading: false,
  isFound: false,
  isOnline: true
}

const initValidate = {
  message: '',
  status: 0,
  isLoading: false,
  isFound: false,
  isOnline: true
}

const initProfile = {
  message: '',
  status: 0,
  verifyStatus: '',
  user: {},
  isLoading: false,
  isOnline: true,
  isFound: false
}

const initForgetPass = {
  email: '',
  message: '',
  status: '',
  isLoading: false,
  isOnline: true,
  isFound: false
}

const initVerify = {
  message: '',
  status: '',
  isLoading: false,
  isFound: false,
  isOnline: true
}

const initLogin = {
  login: false
}

function auth (state = initUser, action) {
  console.log(action.type)
  switch (action.type) {
    case actions.USER_LOGIN_REQUEST:
      return {
        ...state,
        email: action.email,
        token: '',
        uid: 0,
        user: {},
        message: action.message,
        status: action.code,
        isLoading: true
      }
    case actions.USER_LOGIN_SUCCESS:
      return {
        ...state,
        email: action.data.email,
        token: action.data.token,
        uid: action.data.id,
        user: action.data,
        message: action.message,
        status: action.code,
        isLoading: false,
        isOnline: true,
        isFound: true
      }
    case actions.USER_LOGIN_FAILURE:
      return {
        ...state,
        email: '',
        token: '',
        uid: 0,
        user: {},
        message: action.message,
        status: action.code,
        isLoading: false,
        isOnline: action.isOnline,
        isFound: false
      }
    case actions.LOGIN_SOCIAL_REQUEST:
      return {
        ...state,
        email: action.email,
        token: '',
        uid: 0,
        user: {},
        message: action.message,
        status: action.code,
        isLoading: true
      }
    case actions.LOGIN_SOCIAL_SUCCESS:
      return {
        ...state,
        email: action.data.email,
        token: action.data.token,
        uid: action.data.id,
        user: action.data,
        message: action.message,
        status: action.code,
        is_required_password: action.data.is_required_password,
        isLoading: false,
        isOnline: true,
        isFound: true
      }
    case actions.LOGIN_SOCIAL_FAILURE:
      return {
        ...state,
        email: '',
        token: '',
        uid: 0,
        user: {},
        message: action.message,
        status: action.code,
        isLoading: false,
        isOnline: action.isOnline
      }
    case actions.USER_LOGOUT_SUCCESS:
      return {
        ...state,
        message: action.message,
        status: action.code,
        isLoading: false,
        isFound: true
      }
    default:
      return state
  }
}

function newPassword (state = initVerify, action) {
  switch (action.type) {
    case actions.USER_NEWPASSWORD_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case actions.USER_NEWPASSWORD_SUCCESS:
      return {
        ...state,
        message: action.message,
        status: action.code,
        isLoading: false,
        isOnline: true,
        isFound: true
      }
    case actions.USER_NEWPASSWORD_FAILURE:
      return {
        ...state,
        message: action.message,
        status: action.code,
        isLoading: false,
        isOnline: action.isOnline
      }
    default:
      return state
  }
}

function verify (state = initVerify, action) {
  switch (action.type) {
    case actions.USER_VERIFICATION_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case actions.USER_VERIFICATION_SUCCESS:
      return {
        ...state,
        message: action.message,
        status: action.code,
        isLoading: false,
        isOnline: true,
        isFound: true
      }
    case actions.USER_VERIFICATION_FAILURE:
      return {
        ...state,
        message: action.message,
        status: action.code,
        isLoading: false,
        isOnline: action.isOnline
      }
    default:
      return state
  }
}

function getProfile (state = initProfile, action) {
  switch (action.type) {
    case actions.GET_PROFILE_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case actions.GET_PROFILEMANAGE_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case actions.GET_PROFILE_SUCCESS:
      return {
        ...state,
        verifyStatus: action.data.user.status,
        user: action.data,
        message: action.message,
        status: action.code,
        isLoading: false,
        isOnline: true,
        isFound: true
      }
    case actions.GET_PROFILEMANAGE_SUCCESS:
      return {
        ...state,
        verifyStatus: action.data.user.status,
        user: action.data,
        message: action.message,
        status: action.code,
        isLoading: false,
        isOnline: true,
        isFound: true
      }
    case actions.GET_PROFILE_FAILURE:
      return {
        ...state,
        message: action.message,
        status: action.code,
        isLoading: false,
        isOnline: action.isOnline
      }
    case actions.GET_PROFILEMANAGE_FAILURE:
      return {
        ...state,
        message: action.message,
        status: action.code,
        isLoading: false,
        isOnline: action.isOnline
      }
    default:
      return state
  }
}

function updateProfile (state = initUpdate, action) {
  switch (action.type) {
    case actions.UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case actions.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        message: action.message,
        status: action.code,
        isLoading: false,
        isFound: true,
        isOnline: true
      }
    case actions.FORGET_PASSWORD_FAILURE:
      return {
        ...state,
        message: action.message,
        status: action.code,
        isLoading: false,
        isFound: false,
        isOnline: action.isOnline
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
        user: {},
        message: '',
        status: 0,
        isLoading: false
      }
    case actions.USER_REGISTER_SUCCESS:
      return {
        ...state,
        email: action.data.email,
        uid: action.data.id,
        user: action.data,
        token: action.data.token,
        message: action.message,
        status: action.code,
        isOnline: true,
        isLoading: false,
        isFound: true
      }
    case actions.USER_REGISTER_FAILURE:
      return {
        ...state,
        email: '',
        token: '',
        uid: 0,
        user: {},
        message: action.message,
        status: action.code,
        isLoading: false,
        isOnline: action.isOnline
      }
    default:
      return state
  }
}

function validateToken (state = initValidate, action) {
  switch (action.type) {
    case actions.VALIDATE_TOKENFORGETPASSWORD_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case actions.VALIDATE_TOKENFORGETPASSWORD_SUCCESS:
      return {
        ...state,
        message: action.message,
        status: action.code,
        isOnline: true,
        isLoading: false,
        isFound: true
      }
    case actions.VALIDATE_TOKENFORGETPASSWORD_FAILURE:
      return {
        ...state,
        message: action.message,
        status: action.code,
        isLoading: false,
        isOnline: action.isOnline
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
        status: '',
        isLoading: true
      }
    case actions.FORGET_PASSWORD_SUCCESS:
      return {
        ...state,
        message: action.message,
        status: action.code,
        isLoading: false,
        isOnline: true,
        isFound: true
      }
    case actions.FORGET_PASSWORD_FAILURE:
      return {
        ...state,
        message: action.message,
        status: action.code,
        isLoading: false,
        isOnline: action.isOnline
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
  switch (action.type) {
    case actions.USER_BALANCE_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case actions.USER_BALANCE_SUCCESS:
      return {
        ...state,
        balance: action.data.user_balance,
        message: action.message,
        status: action.code,
        isLoading: false,
        isFound: true,
        isOnline: true
      }
    case actions.USER_BALANCE_FAILURE:
      return {
        ...state,
        message: action.message,
        status: action.code,
        isLoading: false,
        isFound: false,
        isOnline: action.isOnline
      }
    default:
      return state
  }
}

function changePassword (state = initUpdate, action) {
  switch (action.type) {
    case actions.CHANGE_PASSWORD_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case actions.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        message: action.message,
        status: action.code,
        isLoading: false,
        isFound: true,
        isOnline: true
      }
    case actions.CHANGE_PASSWORD_FAILURE:
      return {
        ...state,
        message: action.message,
        status: action.code,
        isLoading: false,
        isFound: false,
        isOnline: action.isOnline
      }
    default:
      return state
  }
}

function favoriteStore (state = initUpdate, action) {
  switch (action.type) {
    case actions.FAVORITE_STORE_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case actions.FAVORITE_STORE_SUCCESS:
      return {
        ...state,
        message: action.message,
        status: action.code,
        isLoading: false,
        isFound: true,
        isOnline: true
      }
    case actions.FAVORITE_STORE_FAILURE:
      return {
        ...state,
        message: action.message,
        status: action.code,
        isLoading: false,
        isFound: false,
        isOnline: action.isOnline
      }
    default:
      return state
  }
}

function addToBucket (state = initUpdate, action) {
  switch (action.type) {
    case actions.ADDTO_BUCKET_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case actions.ADDTO_BUCKET_SUCCESS:
      return {
        ...state,
        message: action.message,
        status: action.code,
        isLoading: false,
        isFound: true,
        isOnline: true
      }
    case actions.ADDTO_BUCKET_FAILURE:
      return {
        ...state,
        message: action.message,
        status: action.code,
        isLoading: false,
        isFound: false,
        isOnline: action.isOnline
      }
    default:
      return state
  }
}

function countBucket (state = initBucket, action) {
  switch (action.type) {
    case actions.COUNT_BUCKET_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case actions.COUNT_BUCKET_SUCCESS:
      return {
        ...state,
        count: action.data.count,
        message: action.message,
        status: action.code,
        isLoading: false,
        isFound: true,
        isOnline: true
      }
    case actions.COUNT_BUCKET_FAILURE:
      return {
        ...state,
        message: action.message,
        status: action.code,
        isLoading: false,
        isFound: false,
        isOnline: action.isOnline
      }
    default:
      return state
  }
}

function getPhone (state = initGetPhone, action) {
  switch (action.type) {
    case actions.GET_PHONE_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case actions.GET_PHONE_SUCCESS:
      return {
        ...state,
        phone: action.data.phone_number,
        message: action.message,
        status: action.code,
        isLoading: false,
        isFound: true,
        isOnline: true
      }
    case actions.GET_PHONE_FAILURE:
      return {
        ...state,
        message: action.message,
        status: action.code,
        isLoading: false,
        isFound: false,
        isOnline: action.isOnline
      }
    default:
      return state
  }
}

function getBucket (state = initGetBucket, action) {
  switch (action.type) {
    case actions.GET_BUCKET_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case actions.GET_BUCKET_SUCCESS:
      return {
        ...state,
        bukcets: action.data,
        message: action.message,
        status: action.code,
        isLoading: false,
        isFound: true,
        isOnline: true
      }
    case actions.GET_BUCKET_FAILURE:
      return {
        ...state,
        message: action.message,
        status: action.code,
        isLoading: false,
        isFound: false,
        isOnline: action.isOnline
      }
    default:
      return state
  }
}

function updatePhone (state = initUpdate, action) {
  switch (action.type) {
    case actions.UPDATE_PHONE_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case actions.UPDATE_PHONE_SUCCESS:
      return {
        ...state,
        message: action.message,
        status: action.code,
        isLoading: false,
        isFound: true,
        isOnline: true
      }
    case actions.UPDATE_PHONE_FAILURE:
      return {
        ...state,
        message: action.message,
        status: action.code,
        isLoading: false,
        isFound: false,
        isOnline: action.isOnline
      }
    default:
      return state
  }
}

function getDiscussion (state = initDiscussion, action) {
  switch (action.type) {
    case actions.GET_USERDISCUSSION_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case actions.GET_USERDISCUSSION_SUCCESS:
      return {
        ...state,
        discussions: action.data,
        message: action.message,
        status: action.code,
        isLoading: false,
        isFound: true,
        isOnline: true
      }
    case actions.GET_USERDISCUSSION_FAILURE:
      return {
        ...state,
        message: action.message,
        status: action.code,
        isLoading: false,
        isFound: false,
        isOnline: action.isOnline
      }
    default:
      return state
  }
}

function sendOTPPhone (state = initValidate, action) {
  switch (action.type) {
    case actions.SEND_PHONEOTP_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case actions.SEND_PHONEOTP_SUCCESS:
      return {
        ...state,
        message: action.message,
        status: action.code,
        isLoading: false,
        isFound: true,
        isOnline: true
      }
    case actions.SEND_PHONEOTP_FAILURE:
      return {
        ...state,
        message: action.message,
        status: action.code,
        isLoading: false,
        isFound: false,
        isOnline: action.isOnline
      }
    default:
      return state
  }
}

function verifyPhone (state = initValidate, action) {
  switch (action.type) {
    case actions.VERIFIY_PHONE_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case actions.VERIFIY_PHONE_SUCCESS:
      return {
        ...state,
        message: action.message,
        status: action.code,
        isLoading: false,
        isFound: true,
        isOnline: true
      }
    case actions.VERIFIY_PHONE_FAILURE:
      return {
        ...state,
        message: action.message,
        status: action.code,
        isLoading: false,
        isFound: false,
        isOnline: action.isOnline
      }
    default:
      return state
  }
}

function listFavoriteStore (state = initFavoriteStore, action) {
  console.log(action.type)
  switch (action.type) {
    case actions.LIST_FAVORITSTORE_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case actions.LIST_FAVORITSTORE_SUCCESS:
      return {
        ...state,
        stores: action.data,
        message: action.message,
        status: action.code,
        isLoading: false,
        isFound: true,
        isOnline: true
      }
    case actions.LIST_FAVORITSTORE_FAILURE:
      return {
        ...state,
        message: action.message,
        status: action.code,
        isLoading: false,
        isFound: false,
        isOnline: action.isOnline
      }
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
  addToBucket,
  countBucket,
  getBucket,
  getPhone,
  updatePhone,
  getDiscussion,
  listFavoriteStore,
  sendOTPPhone,
  verifyPhone
}

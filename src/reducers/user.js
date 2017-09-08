import * as actions from '../actions/user'
import { reqState, succState, failState, buildInitState, createReducer } from '../config'

const initUser = buildInitState({
  email: '',
  token: '',
  uid: 0,
  user: {}
})

const initProfile = buildInitState({
  verifyStatus: '',
  user: {}
})

export const auth = createReducer(initUser)
  .addReducer({
    type: actions.USER_LOGIN,
    customReqState: (state, action) => ({ ...reqState(initUser), email: action.email }),
    customSuccState: (state, action) => ({
      email: action.data.email,
      token: action.data.token,
      uid: action.data.id,
      user: action.data,
      ...succState(action) }),
    customFailState: (state, action) => ({ ...initUser, ...failState(action) })
  })
  .addReducer({
    type: actions.LOGIN_SOCIAL,
    customReqState: (state, action) => ({ ...reqState(initUser), email: action.email }),
    customSuccState: (state, action) => ({
      email: action.data.email,
      token: action.data.token,
      uid: action.data.id,
      user: action.data,
      is_required_password: action.data.is_required_password,
      ...succState(action) }),
    customFailState: (state, action) => ({ ...initUser, ...failState(action) })
  })
  .addReducer({
    type: actions.USER_LOGOUT,
    customReqState: (state, action) => ({
      email: state.email,
      token: state.token,
      uid: state.uid,
      user: state.user,
      ...reqState() }),
    customSuccState: (state, action) => ({ ...initUser, ...succState(action) })
  }).run()

export const newPassword = createReducer(buildInitState())
  .addReducer({
    type: actions.USER_NEW_PASSWORD
  }).run()

export const verify = createReducer(buildInitState())
  .addReducer({
    type: actions.USER_VERIFICATION
  }).run()

export const getProfile = createReducer(initProfile)
  .addReducer({
    type: actions.GET_PROFILE,
    customSuccState: (state, action) => ({ verifyStatus: action.data.user.status, ...succState(action, 'user') }),
    customFailState: (state, action) => ({ ...initProfile, ...failState(action) })
  })
  .addReducer({
    type: actions.GET_PROFILE_MANAGE,
    resultName: 'user',
    add: { verifyStatus: '' }
  }).run()

export const updateProfile = createReducer(buildInitState({ updateProfile: {} }))
  .addReducer({
    type: actions.UPDATE_PROFILE,
    resultName: 'updateProfile'
  }).run()

export const register = createReducer(initUser)
  .addReducer({
    type: actions.USER_REGISTER,
    customReqState: (state, action) => ({ ...reqState(initUser), email: action.email }),
    customSuccState: (state, action) => ({
      email: action.data.email,
      uid: action.data.id,
      user: action.data,
      token: action.data.token,
      ...succState(action) }),
    customFailState: (state, action) => ({ ...initUser, ...failState(action) })
  }).run()

export const validateToken = createReducer(buildInitState())
  .addReducer({
    type: actions.VALIDATE_TOKEN_FORGET_PASSWORD
  }).run()

export const forgetPassword = createReducer(buildInitState({ email: '' }))
  .addReducer({
    type: actions.FORGET_PASSWORD,
    customReqState: (state, action) => reqState({ email: action.email }),
    customSuccState: (state, action) => ({ email: state.email, ...succState(action) }),
    customFailState: (state, action) => ({ email: state.email, ...failState(action) })
  }).run()

export const isLogin = createReducer({ login: false })
  .addReducer({
    type: actions.IS_LOGIN,
    includeNonSaga: true
  }).run()

export const getBalance = createReducer(buildInitState({ balance: 0 }))
  .addReducer({
    type: actions.USER_BALANCE,
    resultName: 'balance'
  }).run()

export const changePassword = createReducer(buildInitState())
  .addReducer({
    type: actions.CHANGE_PASSWORD
  }).run()

export const favoriteStore = createReducer(buildInitState())
  .addReducer({
    type: actions.FAVORITE_STORE
  }).run()

export const getPhone = createReducer(buildInitState({ phone: '' }))
  .addReducer({
    type: actions.GET_PHONE,
    customSuccState: (state, action) => ({ phone: action.data.phone_number, ...succState(action) })
  }).run()

export const updatePhone = createReducer(buildInitState())
  .addReducer({
    type: actions.UPDATE_PHONE
  }).run()

export const getDiscussion = createReducer(buildInitState({ discussions: [] }, true))
  .addReducer({
    type: actions.GET_USER_DISCUSSION,
    resultName: 'discussions'
  }).run()

export const sendOTPPhone = createReducer(buildInitState())
  .addReducer({
    type: actions.SEND_PHONE_OTP
  }).run()

export const verifyPhone = createReducer(buildInitState())
  .addReducer({
    type: actions.VERIFIY_PHONE
  }).run()

export const wishlist = createReducer(buildInitState({ wishlist: [] }))
  .addReducer({
    type: actions.GET_WISHLIST,
    resultName: 'wishlist'
  }).run()

export const sendOTPBank = createReducer(buildInitState())
  .addReducer({
    type: actions.SEND_BANK_OTP
  }).run()

export const listFavoriteStore = createReducer(buildInitState({ stores: [] }, true))
  .addReducer({
    type: actions.LIST_FAVORIT_STORE,
    resultName: 'stores'
  }).run()

export const alterUser = createReducer(buildInitState())
  .addReducer({
    type: actions.UPDATE_FIREBASE_REG_TOKEN
  }).run()

export const notifSettings = createReducer(buildInitState({ settings: [] }))
  .addReducer({
    type: actions.GET_NOTIF_SETTINGS,
    resultName: 'settings',
    add: { type: 'get' }
  })
  .addReducer({
    type: actions.UPDATE_NOTIF_SETTINGS,
    resultName: 'settings',
    add: { type: 'update' }
  }).run()

export const getResolvedResolutions = createReducer(buildInitState({ resolutions: [] }))
  .addReducer({
    type: actions.GET_RESOLVED_RESOLUTIONS,
    resultName: 'resolutions'
  }).run()

export const getUnresolvedResolutions = createReducer(buildInitState({ resolutions: [] }))
  .addReducer({
    type: actions.GET_UNRESOLVED_RESOLUTIONS,
    resultName: 'resolutions'
  }).run()

export const getResolutionDetail = createReducer(buildInitState({ resolution: {} }))
  .addReducer({
    type: actions.GET_RESOLUTION_DETAIL,
    resultName: 'resolution'
  }).run()

export const createResolution = createReducer(buildInitState({ resolution: {} }))
  .addReducer({
    type: actions.CREATE_RESOLUTION,
    resultName: 'resolution'
  }).run()

export const replyResolution = createReducer(buildInitState({ resolution: {} }))
  .addReducer({
    type: actions.REPLY_RESOLUTION,
    resultName: 'resolution'
  }).run()

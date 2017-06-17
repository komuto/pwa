import { combineReducers } from 'redux'
import * as storage from 'redux-storage'
import * as userReducers from './user'

const komutoApps = storage.reducer(combineReducers({
  user: userReducers.auth,
  social: userReducers.authSocial,
  register: userReducers.register,
  forgetPassword: userReducers.forgetPassword,
  isLogin: userReducers.isLogin
}))

export default komutoApps

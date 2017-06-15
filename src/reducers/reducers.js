import { combineReducers } from 'redux'
import * as storage from 'redux-storage'
import * as userReducers from './user'

const komutoApps = storage.reducer(combineReducers({
  user: userReducers.auth,
  forgetPassword: userReducers.forgetPassword
}))

export default komutoApps

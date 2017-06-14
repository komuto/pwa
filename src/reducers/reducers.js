import { combineReducers } from 'redux'
import * as storage from 'redux-storage'
import * as userReducers from './user'

const komutoApps = storage.reducer(combineReducers({
  user: userReducers.auth
}))

export default komutoApps

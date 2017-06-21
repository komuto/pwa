import { combineReducers } from 'redux'
import * as storage from 'redux-storage'
import * as userReducers from './user'
import * as homeReducers from './home'
import * as brandReducers from './brand'
import * as expeditionReducers from './expedition'
import * as locationReducers from './location'

const komutoApps = storage.reducer(combineReducers({
  user: userReducers.auth,
  social: userReducers.authSocial,
  register: userReducers.register,
  forgetPassword: userReducers.forgetPassword,
  isLogin: userReducers.isLogin,
  products: homeReducers.product,
  category: homeReducers.categoryList,
  subCategory: homeReducers.subCategory,
  brands: brandReducers.brand,
  expeditions: expeditionReducers.expedition,
  provinces: locationReducers.province,
  districts: locationReducers.district,
  subdistricts: locationReducers.subdistrict,
  villages: locationReducers.village
}))

export default komutoApps

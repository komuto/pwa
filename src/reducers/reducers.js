import { combineReducers } from 'redux'
import * as storage from 'redux-storage'
import * as userReducers from './user'
import * as homeReducers from './home'
import * as wishlistReducers from './wishlist'
import * as brandReducers from './brand'
import * as expeditionReducers from './expedition'
import * as locationReducers from './location'

const komutoApps = storage.reducer(combineReducers({
  user: userReducers.auth,
  verification: userReducers.verify,
  validation: userReducers.validateToken,
  newPassword: userReducers.newPassword,
  profile: userReducers.getProfile,
  register: userReducers.register,
  forgetPassword: userReducers.forgetPassword,
  isLogin: userReducers.isLogin,
  products: homeReducers.product,
  allCategory: homeReducers.allCategory,
  category: homeReducers.categoryList,
  subCategory: homeReducers.subCategory,
  brands: brandReducers.brand,
  expeditions: expeditionReducers.expedition,
  provinces: locationReducers.province,
  districts: locationReducers.district,
  subdistricts: locationReducers.subdistrict,
  villages: locationReducers.village,
  wishlist: wishlistReducers.wishlist
}))

export default komutoApps

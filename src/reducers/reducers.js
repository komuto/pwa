import { combineReducers } from 'redux'
import * as storage from 'redux-storage'
import * as userReducers from './user'
import * as homeReducers from './home'
import * as wishlistReducers from './wishlist'
import * as brandReducers from './brand'
import * as productReducers from './product'
import * as expeditionReducers from './expedition'
import * as locationReducers from './location'
import * as reviewReducers from './review'
import * as storeReducers from './stores'

const komutoApps = storage.reducer(combineReducers({
  user: userReducers.auth,
  verification: userReducers.verify,
  validation: userReducers.validateToken,
  newPassword: userReducers.newPassword,
  profile: userReducers.getProfile,
  updateProfile: userReducers.updateProfile,
  register: userReducers.register,
  forgetPassword: userReducers.forgetPassword,
  isLogin: userReducers.isLogin,
  balance: userReducers.getBalance,
  products: homeReducers.product,
  searchProduct: homeReducers.searchProduct,
  filterProduct: homeReducers.filterProduct,
  allCategory: homeReducers.allCategory,
  category: homeReducers.categoryList,
  subCategory: homeReducers.subCategory,
  brands: brandReducers.brand,
  brandsByCategory: brandReducers.brandByCategory,
  expeditions: expeditionReducers.expedition,
  expeditionServices: expeditionReducers.expeditionServices,
  shippingCharges: expeditionReducers.shippingCharge,
  provinces: locationReducers.province,
  districts: locationReducers.district,
  subdistricts: locationReducers.subdistrict,
  villages: locationReducers.village,
  wishlist: wishlistReducers.wishlist,
  productDetail: productReducers.getProduct,
  review: reviewReducers.getReview,
  addReview: reviewReducers.addReview,
  stores: storeReducers.stores
}))

export default komutoApps

import { combineReducers } from 'redux'
import * as storage from 'redux-storage'
import * as userReducers from './user'
import * as emailReducers from './email'
import * as homeReducers from './home'
import * as brandReducers from './brand'
import * as productReducers from './product'
import * as expeditionReducers from './expedition'
import * as locationReducers from './location'
import * as reviewReducers from './review'
import * as storeReducers from './stores'
import * as addressReducers from './address'
import * as bankReducers from './bank'
import * as catalogReducers from './catalog'
import * as cartReducers from './cart'

const user = {
  emailCheck: emailReducers.checkEmail,
  user: userReducers.auth,
  verification: userReducers.verify,
  validation: userReducers.validateToken,
  newPassword: userReducers.newPassword,
  changePassword: userReducers.changePassword,
  profile: userReducers.getProfile,
  updateProfile: userReducers.updateProfile,
  register: userReducers.register,
  forgetPassword: userReducers.forgetPassword,
  isLogin: userReducers.isLogin,
  balance: userReducers.getBalance,
  favorite: userReducers.favoriteStore,
  phone: userReducers.getPhone,
  updatePhone: userReducers.updatePhone,
  userDiscussion: userReducers.getDiscussion,
  listFavoriteStore: userReducers.listFavoriteStore,
  sendOTPPhone: userReducers.sendOTPPhone,
  verifyPhone: userReducers.verifyPhone,
  sendOTPBank: userReducers.sendOTPBank,
  wishlist: userReducers.wishlist
}

const home = {
  products: homeReducers.product,
  searchProduct: homeReducers.searchProduct,
  filterProduct: homeReducers.filterProduct,
  allCategory: homeReducers.allCategory,
  category: homeReducers.categoryList,
  subCategory: homeReducers.subCategory
}

const product = {
  productDetail: productReducers.getProduct,
  productByCategory: productReducers.productByCategory,
  productBySearch: productReducers.productBySearch,
  addWishlist: productReducers.addToWishlist,
  addWishlistHome: productReducers.addToWishlistHome,
  discussions: productReducers.getDiscussion,
  newDiscussion: productReducers.newDiscussion,
  comments: productReducers.getComment,
  newComment: productReducers.newComment,
  report: productReducers.reportProduct,
  alterProducts: productReducers.alterProducts
}

const store = {
  stores: storeReducers.stores,
  upload: storeReducers.photoUpload,
  createStore: storeReducers.createStore,
  expeditionListStore: storeReducers.expeditionListStore,
  expeditionStore: storeReducers.expeditionStore,
  verifyStore: storeReducers.verifyStore,
  sendMessageStore: storeReducers.sendMessageStore,
  ownStore: storeReducers.getOwnStore,
  storeProducts: storeReducers.getStoreProducts,
  storeCatalogProducts: storeReducers.getStoreCatalogProducts
}

const address = {
  address: addressReducers.address,
  updateAddress: addressReducers.updateAddress,
  deleteAddress: addressReducers.deleteAddress,
  addAddress: addressReducers.addAddress,
  listAddress: addressReducers.listAddress,
  primaryAddress: addressReducers.primaryAddress
}

const bank = {
  bank: bankReducers.getBank,
  banks: bankReducers.listBank,
  bankAccount: bankReducers.bankAccount,
  listBankAccounts: bankReducers.getBankAccounts
}

const brand = {
  brands: brandReducers.brand,
  brandsByCategory: brandReducers.brandByCategory
}

const catalog = {
  createCatalog: catalogReducers.createCatalog,
  updateCatalog: catalogReducers.updateCatalog,
  getCatalog: catalogReducers.getDetailCatalog,
  getListCatalog: catalogReducers.getListCatalog,
  deleteCatalog: catalogReducers.deleteCatalog
}

const cart = {
  cart: cartReducers.cart,
  promo: cartReducers.getPromo,
  cancelPromo: cartReducers.cancelPromo,
  countCart: cartReducers.countCart
}

const expedition = {
  expeditions: expeditionReducers.expedition,
  expeditionServices: expeditionReducers.expeditionServices,
  estimatedCharges: expeditionReducers.estimatedShipping,
  shippingCharges: expeditionReducers.shippingCharge,
  updateExpedition: expeditionReducers.updateExpediton,
  storeExpeditions: expeditionReducers.getStoreExpeditions
}

const location = {
  provinces: locationReducers.province,
  districts: locationReducers.district,
  subdistricts: locationReducers.subdistrict,
  villages: locationReducers.village
}

const review = {
  productReview: reviewReducers.getReviews,
  addReview: reviewReducers.addReview
}

const komutoApps = storage.reducer(combineReducers({
  ...user,
  ...home,
  ...product,
  ...store,
  ...address,
  ...bank,
  ...brand,
  ...catalog,
  ...cart,
  ...expedition,
  ...location,
  ...review
}))

export default komutoApps

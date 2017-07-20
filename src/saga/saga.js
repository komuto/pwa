import * as userActions from '../actions/user'
import * as homeActions from '../actions/home'
import * as brandActions from '../actions/brand'
import * as wishlistActions from '../actions/wishlist'
import * as expeditionActions from '../actions/expedition'
import * as locationActions from '../actions/location'
import * as productActions from '../actions/product'
import * as reviewActions from '../actions/review'
import * as storeActions from '../actions/stores'
import * as emailActions from '../actions/email'
import * as addressActions from '../actions/address'
import * as bankActions from '../actions/bank'
import * as userSaga from './user'
import * as homeSaga from './home'
import * as brandSaga from './brand'
import * as wishlistSaga from './wishlist'
import * as expeditionSaga from './expedition'
import * as locationSaga from './location'
import * as productSaga from './product'
import * as reviewSaga from './review'
import * as storeSaga from './stores'
import * as emailSaga from './email'
import * as addressSaga from './address'
import * as bankSaga from './bank'
import { takeEvery } from 'redux-saga/effects'

function * dataSaga () {
  yield takeEvery(userActions.USER_REGISTER_REQUEST, userSaga.register)
  yield takeEvery(userActions.USER_VERIFICATION_REQUEST, userSaga.verify)
  yield takeEvery(userActions.USER_LOGIN_REQUEST, userSaga.login)
  yield takeEvery(userActions.USER_LOGOUT_REQUEST, userSaga.logout)
  yield takeEvery(userActions.VALIDATE_TOKENFORGETPASSWORD_REQUEST, userSaga.validateToken)
  yield takeEvery(userActions.GET_PROFILE_REQUEST, userSaga.getProfile)
  yield takeEvery(userActions.GET_PROFILEMANAGE_REQUEST, userSaga.getProfileManage)
  yield takeEvery(userActions.UPDATE_PROFILE_REQUEST, userSaga.updateProfile)
  yield takeEvery(userActions.FORGET_PASSWORD_REQUEST, userSaga.forgetPassword)
  yield takeEvery(userActions.LOGIN_SOCIAL_REQUEST, userSaga.loginSocial)
  yield takeEvery(userActions.USER_NEWPASSWORD_REQUEST, userSaga.newPassword)
  yield takeEvery(userActions.CHANGE_PASSWORD_REQUEST, userSaga.changePassword)
  yield takeEvery(userActions.FAVORITE_STORE_REQUEST, userSaga.favoriteStore)
  yield takeEvery(userActions.USER_BALANCE_REQUEST, userSaga.getBalance)
  yield takeEvery(userActions.ADDTO_BUCKET_REQUEST, userSaga.addToBucket)
  yield takeEvery(userActions.COUNT_BUCKET_REQUEST, userSaga.countBucket)
  yield takeEvery(userActions.GET_BUCKET_REQUEST, userSaga.getBucket)
  yield takeEvery(userActions.GET_PHONE_REQUEST, userSaga.getPhone)
  yield takeEvery(userActions.UPDATE_PHONE_REQUEST, userSaga.updatePhone)
  yield takeEvery(userActions.GET_USERDISCUSSION_REQUEST, userSaga.getDiscussion)
  yield takeEvery(emailActions.CHECK_EMAILVALIDITY_REQUEST, emailSaga.checkEmail)
  yield takeEvery(productActions.GET_PRODUCT_REQUEST, productSaga.getProduct)
  yield takeEvery(productActions.LIST_PRODUCTBYCATEGORY_REQUEST, productSaga.productByCategory)
  yield takeEvery(productActions.LIST_PRODUCTBYSEARCH_REQUEST, productSaga.productBySearch)
  yield takeEvery(productActions.ADDTO_WISHLIST_REQUEST, productSaga.addToWishlist)
  yield takeEvery(productActions.GET_DISCUSSION_REQUEST, productSaga.getDiscussion)
  yield takeEvery(productActions.NEW_DISCUSSION_REQUEST, productSaga.newDiscussion)
  yield takeEvery(homeActions.HOME_PRODUCT_REQUEST, homeSaga.product)
  yield takeEvery(homeActions.SEARCH_PRODUCT_REQUEST, homeSaga.search)
  yield takeEvery(homeActions.FILTER_PRODUCT_REQUEST, homeSaga.filterProduct)
  yield takeEvery(homeActions.ALL_CATEGORY_REQUEST, homeSaga.allCategory)
  yield takeEvery(homeActions.HOME_CATEGORY_REQUEST, homeSaga.categoryList)
  yield takeEvery(homeActions.HOME_SUBCATEGORY_REQUEST, homeSaga.subCategory)
  yield takeEvery(brandActions.GET_BRAND_REQUEST, brandSaga.getBrand)
  yield takeEvery(brandActions.BRAND_BYCATEGORY_REQUEST, brandSaga.getBrandByCategory)
  yield takeEvery(expeditionActions.GET_EXPEDITION_REQUEST, expeditionSaga.getExpedition)
  yield takeEvery(expeditionActions.GET_EXPEDITIONSERVICES_REQUEST, expeditionSaga.getServices)
  yield takeEvery(expeditionActions.ESTIMATED_SHIPPING_REQUEST, expeditionSaga.estimatedCharge)
  yield takeEvery(expeditionActions.GET_SHIPPINGCHARGE_REQUEST, expeditionSaga.getShippingCharge)
  yield takeEvery(expeditionActions.UPDATE_EXPEDITION_REQUEST, expeditionSaga.updateExpedition)
  yield takeEvery(locationActions.GET_PROVINCE_REQUEST, locationSaga.getProvince)
  yield takeEvery(locationActions.GET_DISTRICT_REQUEST, locationSaga.getDistrict)
  yield takeEvery(locationActions.GET_SUBDISTRICT_REQUEST, locationSaga.getSubDistrict)
  yield takeEvery(locationActions.GET_VILLAGE_REQUEST, locationSaga.getVillage)
  yield takeEvery(wishlistActions.GET_WISHLIST_REQUEST, wishlistSaga.wishlist)
  yield takeEvery(reviewActions.GET_REVIEW_REQUEST, reviewSaga.getReview)
  yield takeEvery(reviewActions.ADD_REVIEW_REQUEST, reviewSaga.addReview)
  yield takeEvery(reviewActions.LIST_REVIEW_REQUEST, reviewSaga.listReviewPagination)
  yield takeEvery(storeActions.GET_STORE_REQUEST, storeSaga.getStores)
  yield takeEvery(storeActions.CREATE_STORE_REQUEST, storeSaga.createStore)
  yield takeEvery(storeActions.PHOTO_UPLOAD_REQUEST, storeSaga.photoUpload)
  yield takeEvery(storeActions.STORE_EXPEDITIONLIST_REQUEST, storeSaga.storeExpeditionList)
  yield takeEvery(storeActions.STORE_EXPEDITIONMANAGE_REQUEST, storeSaga.storeExpeditionManage)
  yield takeEvery(addressActions.ADD_ADDRESS_REQUEST, addressSaga.addAddress)
  yield takeEvery(addressActions.UPDATE_ADDRESS_REQUEST, addressSaga.updateAddress)
  yield takeEvery(addressActions.DELETE_ADDRESS_REQUEST, addressSaga.deleteAddress)
  yield takeEvery(addressActions.GET_ADDRESSDETAIL_REQUEST, addressSaga.getAddressDetail)
  yield takeEvery(addressActions.GET_LISTADDRESS_REQUEST, addressSaga.getListAddress)
  yield takeEvery(bankActions.LIST_BANK_REQUEST, bankSaga.listBank)
  yield takeEvery(bankActions.GET_BANK_REQUEST, bankSaga.getBank)
}

export default dataSaga

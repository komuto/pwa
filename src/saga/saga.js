import * as userActions from '../actions/user'
import * as homeActions from '../actions/home'
import * as brandActions from '../actions/brand'
import * as wishlistActions from '../actions/wishlist'
import * as expeditionActions from '../actions/expedition'
import * as locationActions from '../actions/location'
import * as userSaga from './user'
import * as homeSaga from './home'
import * as brandSaga from './brand'
import * as wishlistSaga from './wishlist'
import * as expeditionSaga from './expedition'
import * as locationSaga from './location'
import { takeEvery } from 'redux-saga/effects'

function * dataSaga () {
  yield takeEvery(userActions.USER_REGISTER_REQUEST, userSaga.register)
  yield takeEvery(userActions.USER_VERIFICATION_REQUEST, userSaga.verify)
  yield takeEvery(userActions.USER_LOGIN_REQUEST, userSaga.login)
  yield takeEvery(userActions.USER_LOGOUT_REQUEST, userSaga.logout)
  yield takeEvery(userActions.VALIDATE_TOKENFORGETPASSWORD_REQUEST, userSaga.validateToken)
  yield takeEvery(userActions.GET_PROFILE_REQUEST, userSaga.getProfile)
  yield takeEvery(userActions.FORGET_PASSWORD_REQUEST, userSaga.forgetPassword)
  yield takeEvery(userActions.LOGIN_SOCIAL_REQUEST, userSaga.loginSocial)
  yield takeEvery(userActions.USER_NEWPASSWORD_REQUEST, userSaga.newPassword)
  yield takeEvery(homeActions.HOME_PRODUCT_REQUEST, homeSaga.product)
  yield takeEvery(homeActions.SEARCH_PRODUCT_REQUEST, homeSaga.search)
  yield takeEvery(homeActions.FILTER_PRODUCT_REQUEST, homeSaga.filterProduct)
  yield takeEvery(homeActions.ALL_CATEGORY_REQUEST, homeSaga.allCategory)
  yield takeEvery(homeActions.HOME_CATEGORY_REQUEST, homeSaga.categoryList)
  yield takeEvery(homeActions.HOME_SUBCATEGORY_REQUEST, homeSaga.subCategory)
  yield takeEvery(brandActions.GET_BRAND_REQUEST, brandSaga.getBrand)
  yield takeEvery(expeditionActions.GET_EXPEDITION_REQUEST, expeditionSaga.getExpedition)
  yield takeEvery(locationActions.GET_PROVINCE_REQUEST, locationSaga.getProvince)
  yield takeEvery(locationActions.GET_DISTRICT_REQUEST, locationSaga.getDistrict)
  yield takeEvery(locationActions.GET_SUBDISTRICT_REQUEST, locationSaga.getSubDistrict)
  yield takeEvery(locationActions.GET_VILLAGE_REQUEST, locationSaga.getVillage)
  yield takeEvery(wishlistActions.GET_WISHLIST_REQUEST, wishlistSaga.wishlist)
}

export default dataSaga

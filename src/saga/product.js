import { put } from 'redux-saga/effects'
import * as actions from '../actions/product'
import * as apis from '../api/product'
import { errorHandling, typeSucc, typeFail, buildSaga } from '../config'

function * getProduct (action) {
  try {
    const {data} = yield apis.getProduct(action)
    yield put({ type: typeSucc(actions.GET_PRODUCT), ...data })
  } catch (e) {
    yield errorHandling(typeFail(actions.GET_PRODUCT), e)
  }
}

function * productByCategory (action) {
  try {
    const {data} = yield apis.getProductBy(action)
    yield put({ type: typeSucc(actions.LIST_PRODUCT_BY_CATEGORY), ...data })
  } catch (e) {
    yield errorHandling(typeFail(actions.LIST_PRODUCT_BY_CATEGORY), e)
  }
}

function * productBySearch (action) {
  try {
    const {data} = yield apis.getProductBy(action)
    yield put({ type: typeSucc(actions.LIST_PRODUCT_BY_SEARCH), ...data })
  } catch (e) {
    yield errorHandling(typeFail(actions.LIST_PRODUCT_BY_SEARCH), e)
  }
}

function * addToWishlist (action) {
  try {
    const {data} = yield apis.addToWishlist(action)
    yield put({ type: typeSucc(actions.ADD_TO_WISHLIST), ...data })
  } catch (e) {
    yield errorHandling(typeFail(actions.ADD_TO_WISHLIST), e)
  }
}

function * addToWishlistHome (action) {
  try {
    const {data} = yield apis.addToWishlistHome(action)
    yield put({ type: typeSucc(actions.ADD_TO_WISHLIST_HOME), ...data })
  } catch (e) {
    yield errorHandling(typeFail(actions.ADD_TO_WISHLIST_HOME), e)
  }
}

function * getDiscussion (action) {
  try {
    const {data} = yield apis.getDiscussion(action)
    yield put({ type: typeSucc(actions.GET_DISCUSSION), ...data })
  } catch (e) {
    yield errorHandling(typeFail(actions.GET_DISCUSSION), e)
  }
}

function * newDiscussion (action) {
  try {
    const {data} = yield apis.newDiscussion(action)
    yield put({ type: typeSucc(actions.NEW_DISCUSSION), ...data })
  } catch (e) {
    yield errorHandling(typeFail(actions.NEW_DISCUSSION), e)
  }
}

function * newComment (action) {
  try {
    const {data} = yield apis.newComment(action)
    yield put({ type: typeSucc(actions.NEW_COMMENT), ...data })
  } catch (e) {
    yield errorHandling(typeFail(actions.NEW_COMMENT), e)
  }
}

function * getComment (action) {
  try {
    const {data} = yield apis.getComment(action)
    yield put({ type: typeSucc(actions.GET_COMMENT), ...data })
  } catch (e) {
    yield errorHandling(typeFail(actions.GET_COMMENT), e)
  }
}

function * reportProduct (action) {
  try {
    const {data} = yield apis.reportProduct(action)
    yield put({ type: typeSucc(actions.REPORT_PRODUCT), ...data })
  } catch (e) {
    yield errorHandling(typeFail(actions.REPORT_PRODUCT), e)
  }
}

export const createProduct = buildSaga([], apis.createProduct, actions.CREATE_PRODUCT)

export const hideProducts = buildSaga(['product_ids'], apis.hideProducts, actions.HIDE_PRODUCTS)

export const deleteProducts = buildSaga(['product_ids'], apis.deleteProducts, actions.DELETE_PRODUCTS)

export const changeCatalogProducts = buildSaga(['catalog_id', 'product_ids'], apis.changeCatalogProducts, actions.CHANGE_CATALOG)

export {
    getProduct,
    productByCategory,
    productBySearch,
    addToWishlist,
    addToWishlistHome,
    getDiscussion,
    newDiscussion,
    newComment,
    getComment,
    reportProduct
}

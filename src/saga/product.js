import { put } from 'redux-saga/effects'
import * as productActions from '../actions/product'
import * as productApi from '../api/product'
import { errorHandling } from '../config'

function * getProduct (action) {
  try {
    const {data} = yield productApi.getProduct(action)
    yield put({ type: productActions.GET_PRODUCT_SUCCESS, ...data })
  } catch (e) {
    yield errorHandling(productActions.GET_PRODUCT_FAILURE, e)
  }
}

function * productByCategory (action) {
  try {
    const {data} = yield productApi.productBy(action)
    yield put({ type: productActions.LIST_PRODUCTBYCATEGORY_SUCCESS, ...data })
  } catch (e) {
    console.log(e)
    yield errorHandling(productActions.LIST_PRODUCTBYCATEGORY_FAILURE, e)
  }
}

function * productBySearch (action) {
  try {
    const {data} = yield productApi.productBy(action)
    yield put({ type: productActions.LIST_PRODUCTBYSEARCH_SUCCESS, ...data })
  } catch (e) {
    console.log(e)
    yield errorHandling(productActions.LIST_PRODUCTBYSEARCH_FAILURE, e)
  }
}

function * addToWishlist (action) {
  try {
    const {data} = yield productApi.addToWishlist(action)
    yield put({ type: productActions.ADDTO_WISHLIST_SUCCESS, ...data })
  } catch (e) {
    yield errorHandling(productActions.ADDTO_WISHLIST_FAILURE, e)
  }
}

function * getDiscussion (action) {
  try {
    const {data} = yield productApi.getDiscussion(action)
    yield put({ type: productActions.GET_DISCUSSION_SUCCESS, ...data })
  } catch (e) {
    yield errorHandling(productActions.GET_DISCUSSION_FAILURE, e)
  }
}

function * newDiscussion (action) {
  try {
    const {data} = yield productApi.newDiscussion(action)
    yield put({ type: productActions.NEW_DISCUSSION_SUCCESS, ...data })
  } catch (e) {
    yield errorHandling(productActions.NEW_DISCUSSION_FAILURE, e)
  }
}

export {
    getProduct,
    productByCategory,
    productBySearch,
    addToWishlist,
    getDiscussion,
    newDiscussion
}

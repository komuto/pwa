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

export {
    getProduct,
    productByCategory,
    productBySearch
}

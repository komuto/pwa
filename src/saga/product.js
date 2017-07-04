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

export {
    getProduct
}

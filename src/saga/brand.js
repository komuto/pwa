import { put } from 'redux-saga/effects'
import * as brandApi from '../api/brand'
import * as brandActions from '../actions/brand'
import { errorHandling, typeSucc, typeFail } from '../config'

function * getBrand (action) {
  try {
    const {data} = yield brandApi.getBrand(action)
    yield put({ type: typeSucc(brandActions.GET_BRAND), ...data })
  } catch (e) {
    yield errorHandling(typeFail(brandActions.GET_BRAND), e)
  }
}

function * getBrandByCategory (action) {
  try {
    const {data} = yield brandApi.getBrandByCategory(action)
    yield put({ type: typeSucc(brandActions.BRAND_BY_CATEGORY), ...data })
  } catch (e) {
    yield errorHandling(typeFail(brandActions.BRAND_BY_CATEGORY), e)
  }
}

export {
  getBrand,
  getBrandByCategory
}

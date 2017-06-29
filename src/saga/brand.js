import { put } from 'redux-saga/effects'
import * as brandApi from '../api/brand'
import * as brandActions from '../actions/brand'
import { errorHandling } from '../config'

function * getBrand (action) {
  try {
    const {data} = yield brandApi.getBrand(action)
    yield put({ type: brandActions.GET_BRAND_SUCCESS, ...data })
  } catch (e) {
    yield errorHandling(brandActions.GET_BRAND_FAILURE, e)
  }
}

export {
  getBrand
}

import { put } from 'redux-saga/effects'
import * as brandApi from '../api/brand'
import * as brandActions from '../actions/brand'

function * getBrand (action) {
  try {
    const {data} = yield brandApi.getBrand(action)
    yield put({ type: brandActions.GET_BRAND_SUCCESS, ...data })
  } catch (e) {
    const {data} = e.response
    yield put({ type: brandActions.GET_BRAND_FAILURE, ...data })
  }
}

export {
  getBrand
}

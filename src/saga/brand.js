import { put } from 'redux-saga/effects'
import * as brandApi from '../api/brand'
import * as brandActions from '../actions/brand'

const error = {
  message: 'Your device is offline',
  code: 'ENOENT',
  isOnline: false
}

function * getBrand (action) {
  try {
    const {data} = yield brandApi.getBrand(action)
    yield put({ type: brandActions.GET_BRAND_SUCCESS, ...data })
  } catch (e) {
    const data = e.response
    if (data !== undefined) {
      const {data} = e.response
      data.isOnline = true
      yield put({ type: brandActions.GET_BRAND_FAILURE, ...data })
    } else {
      yield put({ type: brandActions.GET_BRAND_FAILURE, ...error })
    }
  }
}

export {
  getBrand
}

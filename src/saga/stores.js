import { put } from 'redux-saga/effects'
import * as storeActions from '../actions/stores'
import * as storeApi from '../api/stores'
import { errorHandling } from '../config'

function * getStores (action) {
  try {
    const {data} = yield storeApi.getStores(action)
    yield put({ type: storeActions.GET_STORE_SUCCESS, ...data })
  } catch (e) {
    yield errorHandling(storeActions.GET_STORE_FAILURE, e)
  }
}

export {
  getStores
}

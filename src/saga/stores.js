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

function * createStore (action) {
  try {
    const {data} = yield storeApi.createStore(action)
    yield put({ type: storeActions.CREATE_STORE_SUCCESS, ...data })
  } catch (e) {
    yield errorHandling(storeActions.CREATE_STORE_FAILURE, e)
  }
}

function * storeExpeditionList (action) {
  try {
    const {data} = yield storeApi.storeExpeditionList()
    yield put({ type: storeActions.STORE_EXPEDITIONLIST_SUCCESS, ...data })
  } catch (e) {
    yield errorHandling(storeActions.STORE_EXPEDITIONLIST_FAILURE, e)
  }
}

function * storeExpeditionManage (action) {
  try {
    const {data} = yield storeApi.storeExpeditionManage()
    yield put({ type: storeActions.STORE_EXPEDITIONMANAGE_SUCCESS, ...data })
  } catch (e) {
    yield errorHandling(storeActions.STORE_EXPEDITIONMANAGE_FAILURE, e)
  }
}

function * photoUpload (action) {
  try {
    const {data} = yield storeApi.photoUpload(action)
    yield put({ type: storeActions.PHOTO_UPLOAD_SUCCESS, ...data })
  } catch (e) {
    yield errorHandling(storeActions.PHOTO_UPLOAD_FAILURE, e)
  }
}

export {
  getStores,
  createStore,
  photoUpload,
  storeExpeditionList,
  storeExpeditionManage
}

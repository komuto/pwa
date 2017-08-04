import { put } from 'redux-saga/effects'
import * as actions from '../actions/stores'
import * as apis from '../api/stores'
import { errorHandling, typeSucc, typeFail, buildSaga } from '../config'

function * getStores (action) {
  try {
    const {data} = yield apis.getStores(action)
    yield put({ type: typeSucc(actions.GET_STORE), ...data })
  } catch (e) {
    yield errorHandling(typeFail(actions.GET_STORE), e)
  }
}

function * createStore (action) {
  try {
    const {data} = yield apis.createStore(action)
    yield put({ type: typeSucc(actions.CREATE_STORE), ...data })
  } catch (e) {
    yield errorHandling(typeFail(actions.CREATE_STORE), e)
  }
}

function * storeExpeditionList (action) {
  try {
    const {data} = yield apis.storeExpeditionList()
    yield put({ type: typeSucc(actions.STORE_EXPEDITION_LIST), ...data })
  } catch (e) {
    yield errorHandling(typeFail(actions.STORE_EXPEDITION_LIST), e)
  }
}

function * storeExpeditionManage (action) {
  try {
    const {data} = yield apis.storeExpeditionManage()
    yield put({ type: typeSucc(actions.STORE_EXPEDITION_MANAGE), ...data })
  } catch (e) {
    yield errorHandling(typeFail(actions.STORE_EXPEDITION_MANAGE), e)
  }
}

function * photoUpload (action) {
  try {
    const {data} = yield apis.photoUpload(action)
    yield put({ type: typeSucc(actions.PHOTO_UPLOAD), ...data })
  } catch (e) {
    yield errorHandling(typeFail(actions.PHOTO_UPLOAD), e)
  }
}

function * verifyStore (action) {
  try {
    const {data} = yield apis.verifyStore(action)
    yield put({ type: typeSucc(actions.VERIFY_STORE), ...data })
  } catch (e) {
    yield errorHandling(typeFail(actions.VERIFY_STORE), e)
  }
}

function * sendMessageStore (action) {
  try {
    const {data} = yield apis.sendMessageStore(action)
    yield put({ type: typeSucc(actions.MESSAGE_STORE), ...data })
  } catch (e) {
    yield errorHandling(typeFail(actions.MESSAGE_STORE), e)
  }
}

export const getOwnStore = function * () {
  try {
    const { data } = yield apis.getOwnStore()
    data.data = data.data.store
    yield put({ type: typeSucc(actions.GET_OWN_STORE), ...data })
  } catch (e) {
    yield errorHandling(typeFail(actions.GET_OWN_STORE), e)
  }
}

export const getStoreProducts = function * ({ hidden }) {
  try {
    const { data } = yield apis.getStoreProducts({ hidden })
    yield put({ type: typeSucc(actions.GET_STORE_PRODUCTS), ...data })
  } catch (e) {
    yield errorHandling(typeFail(actions.GET_STORE_PRODUCTS), e)
  }
}

export const getStoreCatalogProducts = buildSaga(['id'], apis.getStoreCatalogProducts, actions.GET_STORE_CATALOG_PRODUCTS)

export {
  getStores,
  createStore,
  photoUpload,
  storeExpeditionList,
  storeExpeditionManage,
  verifyStore,
  sendMessageStore
}

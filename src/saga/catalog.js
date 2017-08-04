import { put } from 'redux-saga/effects'
import * as actions from '../actions/catalog'
import * as apis from '../api/catalog'
import { errorHandling, typeSucc, typeFail } from '../config'

function * createCatalog (action) {
  try {
    const {data} = yield apis.createCatalog(action)
    yield put({ type: typeSucc(actions.CREATE_CATALOG), ...data })
  } catch (e) {
    yield errorHandling(typeFail(actions.CREATE_CATALOG), e)
  }
}

function * getCatalog (action) {
  try {
    const {data} = yield apis.getCatalog(action)
    yield put({ type: typeSucc(actions.GET_CATALOG), ...data })
  } catch (e) {
    yield errorHandling(typeFail(actions.GET_CATALOG), e)
  }
}

function * getListCatalog (action) {
  try {
    const {data} = yield apis.getListCatalog(action)
    yield put({ type: typeSucc(actions.GET_LIST_CATALOG), ...data })
  } catch (e) {
    yield errorHandling(typeFail(actions.GET_LIST_CATALOG), e)
  }
}

function * updateCatalog (action) {
  try {
    const {data} = yield apis.updateCatalog(action)
    yield put({ type: typeSucc(actions.UPDATE_CATALOG), ...data })
  } catch (e) {
    yield errorHandling(typeFail(actions.UPDATE_CATALOG), e)
  }
}

function * deleteCatalog (action) {
  try {
    const {data} = yield apis.deleteCatalog(action)
    yield put({ type: typeSucc(actions.DELETE_CATALOG), ...data })
  } catch (e) {
    yield errorHandling(typeFail(actions.DELETE_CATALOG), e)
  }
}

export {
  createCatalog,
  getCatalog,
  getListCatalog,
  updateCatalog,
  deleteCatalog
}

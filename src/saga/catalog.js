import { put } from 'redux-saga/effects'
import * as actions from '../actions/catalog'
import * as apis from '../api/catalog'
import { errorHandling } from '../config'

function * createCatalog (action) {
  try {
    const {data} = yield apis.createCatalog(action)
    yield put({ type: actions.CREATE_CATALOG_SUCCESS, ...data })
  } catch (e) {
    yield errorHandling(actions.CREATE_CATALOG_FAILURE, e)
  }
}

function * getCatalog (action) {
  try {
    const {data} = yield apis.getCatalog(action)
    yield put({ type: actions.GET_CATALOG_SUCCESS, ...data })
  } catch (e) {
    yield errorHandling(actions.GET_CATALOG_FAILURE, e)
  }
}

function * getListCatalog (action) {
  try {
    const {data} = yield apis.getListCatalog(action)
    yield put({ type: actions.GET_LISTCATALOG_SUCCESS, ...data })
  } catch (e) {
    yield errorHandling(actions.GET_LISTCATALOG_FAILURE, e)
  }
}

function * updateCatalog (action) {
  try {
    const {data} = yield apis.updateCatalog(action)
    yield put({ type: actions.UPDATE_CATALOG_SUCCESS, ...data })
  } catch (e) {
    yield errorHandling(actions.UPDATE_CATALOG_FAILURE, e)
  }
}

function * deleteCatalog (action) {
  try {
    const {data} = yield apis.deleteCatalog(action)
    yield put({ type: actions.DELETE_CATALOG_SUCCESS, ...data })
  } catch (e) {
    yield errorHandling(actions.DELETE_CATALOG_FAILURE, e)
  }
}

export {
  createCatalog,
  getCatalog,
  getListCatalog,
  updateCatalog,
  deleteCatalog
}

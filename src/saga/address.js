import { put } from 'redux-saga/effects'
import * as actions from '../actions/address'
import * as apis from '../api/address'
import { errorHandling, typeSucc, typeFail } from '../config'

function * addAddress (action) {
  try {
    const {data} = yield apis.addAddress(action)
    yield put({ type: typeSucc(actions.ADD_ADDRESS), ...data })
  } catch (e) {
    yield errorHandling(typeFail(actions.ADD_ADDRESS), e)
  }
}

function * updateAddress (action) {
  try {
    const {data} = yield apis.updateAddress(action)
    yield put({ type: typeSucc(actions.UPDATE_ADDRESS), ...data })
  } catch (e) {
    yield errorHandling(typeFail(actions.UPDATE_ADDRESS), e)
  }
}

function * deleteAddress (action) {
  try {
    const {data} = yield apis.deleteAddress(action)
    yield put({ type: typeSucc(actions.DELETE_ADDRESS), ...data })
  } catch (e) {
    yield errorHandling(typeFail(actions.DELETE_ADDRESS), e)
  }
}

function * getAddressDetail (action) {
  try {
    const {data} = yield apis.getAddressDetail(action)
    yield put({ type: typeSucc(actions.GET_ADDRESS_DETAIL), ...data })
  } catch (e) {
    yield errorHandling(typeFail(actions.GET_ADDRESS_DETAIL), e)
  }
}

function * getListAddress (action) {
  try {
    const {data} = yield apis.getListAddress(action)
    yield put({ type: typeSucc(actions.GET_LIST_ADDRESS), ...data })
  } catch (e) {
    yield errorHandling(typeFail(actions.GET_LIST_ADDRESS), e)
  }
}

function * getPrimaryAddress () {
  try {
    const {data} = yield apis.getPrimaryAddress()
    yield put({ type: typeSucc(actions.GET_PRIMARY_ADDRESS), ...data })
  } catch (e) {
    yield errorHandling(typeFail(actions.GET_PRIMARY_ADDRESS), e)
  }
}

export {
    addAddress,
    updateAddress,
    deleteAddress,
    getAddressDetail,
    getListAddress,
    getPrimaryAddress
}

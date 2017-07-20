import { put } from 'redux-saga/effects'
import * as actions from '../actions/address'
import * as apis from '../api/address'
import { errorHandling } from '../config'

function * addAddress (action) {
  try {
    const {data} = yield apis.addAddress(action)
    yield put({ type: actions.ADD_ADDRESS_SUCCESS, ...data })
  } catch (e) {
    console.log(e)
    yield errorHandling(actions.ADD_ADDRESS_FAILURE, e)
  }
}

function * updateAddress (action) {
  try {
    const {data} = yield apis.updateAddress(action)
    yield put({ type: actions.UPDATE_ADDRESS_SUCCESS, ...data })
  } catch (e) {
    yield errorHandling(actions.UPDATE_ADDRESS_FAILURE, e)
  }
}

function * deleteAddress (action) {
  try {
    const {data} = yield apis.deleteAddress(action)
    yield put({ type: actions.DELETE_ADDRESS_SUCCESS, ...data })
  } catch (e) {
    yield errorHandling(actions.DELETE_ADDRESS_FAILURE, e)
  }
}

function * getAddressDetail (action) {
  try {
    const {data} = yield apis.getAddressDetail(action)
    yield put({ type: actions.GET_ADDRESSDETAIL_SUCCESS, ...data })
  } catch (e) {
    yield errorHandling(actions.GET_ADDRESSDETAIL_FAILURE, e)
  }
}

function * getListAddress (action) {
  try {
    const {data} = yield apis.getListAddress(action)
    yield put({ type: actions.GET_LISTADDRESS_SUCCESS, ...data })
  } catch (e) {
    yield errorHandling(actions.GET_LISTADDRESS_FAILURE, e)
  }
}

function * getPrimaryAddress (action) {
  try {
    const {data} = yield apis.getPrimaryAddress(action)
    yield put({ type: actions.GET_PRIMARYADDRESS_SUCCESS, ...data })
  } catch (e) {
    console.log(e)
    yield errorHandling(actions.GET_PRIMARYADDRESS_FAILURE, e)
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

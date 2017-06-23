import { put } from 'redux-saga/effects'
import * as locationActions from '../actions/location'
import * as locationApi from '../api/location'

const error = {
  message: 'Your device is offline',
  code: 'ENOENT',
  isOnline: false
}

function * getProvince (action) {
  try {
    const {data} = yield locationApi.getProvince(action)
    yield put({ type: locationActions.GET_PROVINCE_SUCCESS, ...data })
  } catch (e) {
    const data = e.response
    if (data !== undefined) {
      const {data} = e.response
      data.isOnline = true
      yield put({ type: locationActions.GET_PROVINCE_FAILURE, ...data })
    } else {
      yield put({ type: locationActions.GET_PROVINCE_FAILURE, ...error })
    }
  }
}

function * getDistrict (action) {
  try {
    const {data} = yield locationApi.getDistrict(action)
    yield put({ type: locationActions.GET_DISTRICT_SUCCESS, ...data })
  } catch (e) {
    const data = e.response
    if (data !== undefined) {
      const {data} = e.response
      data.isOnline = true
      yield put({ type: locationActions.GET_DISTRICT_FAILURE, ...data })
    } else {
      yield put({ type: locationActions.GET_DISTRICT_FAILURE, ...error })
    }
  }
}

function * getSubDistrict (action) {
  try {
    const {data} = yield locationApi.getSubDistrict(action)
    yield put({ type: locationActions.GET_SUBDISTRICT_SUCCESS, ...data })
  } catch (e) {
    const data = e.response
    if (data !== undefined) {
      const {data} = e.response
      data.isOnline = true
      yield put({ type: locationActions.GET_SUBDISTRICT_FAILURE, ...data })
    } else {
      yield put({ type: locationActions.GET_SUBDISTRICT_FAILURE, ...error })
    }
  }
}

function * getVillage (action) {
  try {
    const {data} = yield locationApi.getVillage(action)
    yield put({ type: locationActions.GET_VILLAGE_SUCCESS, ...data })
  } catch (e) {
    const data = e.response
    if (data !== undefined) {
      const {data} = e.response
      data.isOnline = true
      yield put({ type: locationActions.GET_VILLAGE_FAILURE, ...data })
    } else {
      yield put({ type: locationActions.GET_VILLAGE_FAILURE, ...error })
    }
  }
}

export {
  getProvince,
  getDistrict,
  getSubDistrict,
  getVillage
}

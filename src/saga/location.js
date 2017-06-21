import { put } from 'redux-saga/effects'
import * as locationActions from '../actions/location'
import * as locationApi from '../api/location'

function * getProvince (action) {
  try {
    const {data} = yield locationApi.getProvince(action)
    yield put({ type: locationActions.GET_PROVINCE_SUCCESS, ...data })
  } catch (e) {
    const {data} = e.response
    yield put({ type: locationActions.GET_PROVINCE_FAILURE, ...data })
  }
}

function * getDistrict (action) {
  try {
    const {data} = yield locationApi.getDistrict(action)
    yield put({ type: locationActions.GET_DISTRICT_SUCCESS, ...data })
  } catch (e) {
    const {data} = e.response
    yield put({ type: locationActions.GET_DISTRICT_FAILURE, ...data })
  }
}

function * getSubDistrict (action) {
  try {
    const {data} = yield locationApi.getSubDistrict(action)
    yield put({ type: locationActions.GET_SUBDISTRICT_SUCCESS, ...data })
  } catch (e) {
    const {data} = e.response
    yield put({ type: locationActions.GET_SUBDISTRICT_FAILURE, ...data })
  }
}

function * getVillage (action) {
  try {
    const {data} = yield locationApi.getVillage(action)
    yield put({ type: locationActions.GET_VILLAGE_SUCCESS, ...data })
  } catch (e) {
    const {data} = e.response
    yield put({ type: locationActions.GET_VILLAGE_FAILURE, ...data })
  }
}

export {
  getProvince,
  getDistrict,
  getSubDistrict,
  getVillage
}

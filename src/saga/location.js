import { put } from 'redux-saga/effects'
import * as locationActions from '../actions/location'
import * as locationApi from '../api/location'
import { errorHandling } from '../config'

function * getProvince (action) {
  try {
    const {data} = yield locationApi.getProvince(action)
    yield put({ type: locationActions.GET_PROVINCE_SUCCESS, ...data })
  } catch (e) {
    yield errorHandling(locationActions.GET_PROVINCE_FAILURE, e)
  }
}

function * getDistrict (action) {
  try {
    const {data} = yield locationApi.getDistrict(action)
    yield put({ type: locationActions.GET_DISTRICT_SUCCESS, ...data })
  } catch (e) {
    yield errorHandling(locationActions.GET_DISTRICT_FAILURE, e)
  }
}

function * getSubDistrict (action) {
  try {
    const {data} = yield locationApi.getSubDistrict(action)
    yield put({ type: locationActions.GET_SUBDISTRICT_SUCCESS, ...data })
  } catch (e) {
    yield errorHandling(locationActions.GET_SUBDISTRICT_FAILURE, e)
  }
}

function * getVillage (action) {
  try {
    const {data} = yield locationApi.getVillage(action)
    yield put({ type: locationActions.GET_VILLAGE_SUCCESS, ...data })
  } catch (e) {
    yield errorHandling(locationActions.GET_VILLAGE_FAILURE, e)
  }
}

export {
  getProvince,
  getDistrict,
  getSubDistrict,
  getVillage
}

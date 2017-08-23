import * as actions from '../actions/location'
import * as apis from '../api/location'
import { buildSaga } from '../config'

export const getProvince = buildSaga(apis.getProvince, actions.GET_PROVINCE)
export const getDistrict = buildSaga(apis.getDistrict, actions.GET_DISTRICT)
export const getSubDistrict = buildSaga(apis.getSubDistrict, actions.GET_SUBDISTRICT)
export const getVillage = buildSaga(apis.getVillage, actions.GET_VILLAGE)

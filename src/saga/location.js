import * as actions from '../actions/location'
import * as apis from '../api/location'
import { buildSaga } from '../config'

export const getProvince = buildSaga([], apis.getProvince, actions.GET_PROVINCE)
export const getDistrict = buildSaga(['province_id', 'q'], apis.getDistrict, actions.GET_DISTRICT)
export const getSubDistrict = buildSaga(['district_id'], apis.getSubDistrict, actions.GET_SUBDISTRICT)
export const getVillage = buildSaga(['sub_district_id'], apis.getVillage, actions.GET_VILLAGE)

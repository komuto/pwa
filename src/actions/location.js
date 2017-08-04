import { buildAction, typeReq } from '../config'

export const GET_PROVINCE = 'GET_PROVINCE'
export const GET_DISTRICT = 'GET_DISTRICT'
export const GET_SUBDISTRICT = 'GET_SUBDISTRICT'
export const GET_VILLAGE = 'GET_VILLAGE'

export const getProvince = () => buildAction(typeReq(GET_PROVINCE))
export const getDistrict = params => buildAction(typeReq(GET_DISTRICT), params)
export const getSubDistrict = params => buildAction(typeReq(GET_SUBDISTRICT), params)
export const getVillage = params => buildAction(typeReq(GET_VILLAGE), params)

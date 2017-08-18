import { buildAction, typeReq } from '../config'

export const GET_PROVINCE = 'GET_PROVINCE'
export const GET_DISTRICT = 'GET_DISTRICT'
export const GET_SUBDISTRICT = 'GET_SUBDISTRICT'
export const GET_VILLAGE = 'GET_VILLAGE'

/**
 * @state provinces
 */
export const getProvince = () => buildAction(typeReq(GET_PROVINCE))

/**
 * @params params are the same as the api query
 * @state districts
 */
export const getDistrict = params => buildAction(typeReq(GET_DISTRICT), params)

/**
 * @params params are the same as the api query
 * @state subdistricts
 */
export const getSubDistrict = params => buildAction(typeReq(GET_SUBDISTRICT), params)

/**
 * @params params are the same as the api query
 * @state villages
 */
export const getVillage = params => buildAction(typeReq(GET_VILLAGE), params)

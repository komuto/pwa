import { buildAction, typeReq } from '../config'

export const GET_BRAND = 'GET_BRAND'
export const BRAND_BY_CATEGORY = 'BRAND_BY_CATEGORY'

/**
 * @state brands
 */
export const getBrand = () => buildAction(typeReq(GET_BRAND))

/**
 * @params id {int} category id
 * @state brandsByCategory
 */
export const getBrandByCategory = params => buildAction(typeReq(BRAND_BY_CATEGORY), params)

import { buildAction, typeReq } from '../config'

export const GET_BRAND = 'GET_BRAND'
export const BRAND_BY_CATEGORY = 'BRAND_BY_CATEGORY'

export const getBrand = () => buildAction(typeReq(GET_BRAND))
export const getBrandByCategory = params => buildAction(typeReq(BRAND_BY_CATEGORY), params)

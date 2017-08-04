import { buildAction, typeReq } from '../config'

export const HOME_PRODUCT = 'HOME_PRODUCT'
export const HOME_CATEGORY = 'HOME_CATEGORY'
export const ALL_CATEGORY = 'ALL_CATEGORY'
export const HOME_SUBCATEGORY = 'HOME_SUBCATEGORY'
export const FILTER_PRODUCT = 'FILTER_PRODUCT'
export const SEARCH_PRODUCT = 'SEARCH_PRODUCT'
export const STATUS_SUBCATEGORY_RESET = 'STATUS_SUBCATEGORY_RESET'

export const products = params => buildAction(typeReq(HOME_PRODUCT), params)
export const allCategory = () => buildAction(typeReq(ALL_CATEGORY))
export const categoryList = () => buildAction(typeReq(HOME_CATEGORY))
export const search = params => buildAction(typeReq(SEARCH_PRODUCT), params)
export const filter = params => buildAction(typeReq(FILTER_PRODUCT), params)
export const subCategory = params => buildAction(typeReq(HOME_SUBCATEGORY), params)
export const resetStatus = () => buildAction(STATUS_SUBCATEGORY_RESET)

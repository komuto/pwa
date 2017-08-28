import { buildAction, typeReq } from '../config'

export const HOME_PRODUCT = 'HOME_PRODUCT'
export const ALL_CATEGORY = 'ALL_CATEGORY'
export const GET_CATEGORIES_1 = 'GET_CATEGORIES_1'
export const GET_CATEGORIES_2 = 'GET_CATEGORIES_2'
export const GET_CATEGORIES_3 = 'GET_CATEGORIES_3'
export const GET_CATEGORIES_4 = 'GET_CATEGORIES_4'
export const FILTER_PRODUCT = 'FILTER_PRODUCT'
export const SEARCH_PRODUCT = 'SEARCH_PRODUCT'
export const STATUS_SUBCATEGORY_RESET = 'STATUS_SUBCATEGORY_RESET'

export const products = params => buildAction(typeReq(HOME_PRODUCT), params)
export const allCategory = () => buildAction(typeReq(ALL_CATEGORY))
export const categoryList = () => buildAction(typeReq(GET_CATEGORIES_1))
export const subCategory = params => buildAction(typeReq(GET_CATEGORIES_2), params)
export const subCategory2 = params => buildAction(typeReq(GET_CATEGORIES_3), params)
export const subCategory3 = params => buildAction(typeReq(GET_CATEGORIES_4), params)
export const search = params => buildAction(typeReq(SEARCH_PRODUCT), params)
export const filter = params => buildAction(typeReq(FILTER_PRODUCT), params)
export const resetStatus = () => buildAction(STATUS_SUBCATEGORY_RESET)

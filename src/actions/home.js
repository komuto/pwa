import { buildAction, typeReq, typeReset } from '../config'

export const HOME_PRODUCT = 'HOME_PRODUCT'
export const ALL_CATEGORY = 'ALL_CATEGORY'
export const GET_CATEGORIES_1 = 'GET_CATEGORIES_1'
export const GET_CATEGORIES_2 = 'GET_CATEGORIES_2'
export const GET_CATEGORIES_3 = 'GET_CATEGORIES_3'
export const GET_CATEGORIES_4 = 'GET_CATEGORIES_4'
export const FILTER_PRODUCT = 'FILTER_PRODUCT'
export const SEARCH_PRODUCT = 'SEARCH_PRODUCT'

/**
 * @param params are the same as the api query
 * @state products
 */
export const products = params => buildAction(typeReq(HOME_PRODUCT), params)

/**
 * @state allCategory
 */
export const allCategory = () => buildAction(typeReq(ALL_CATEGORY))

/**
 * @state category
 */
export const categoryList = () => buildAction(typeReq(GET_CATEGORIES_1))

/**
 * @params id {int} category id
 * @state subcategory
 */
export const subCategory = params => buildAction(typeReq(GET_CATEGORIES_2), params)
export const resetStatus = () => buildAction(typeReset(GET_CATEGORIES_2))

/**
 * @params id {int} category id
 * @state subcategory2
 */
export const subCategory2 = params => buildAction(typeReq(GET_CATEGORIES_3), params)

/**
 * @params id {int} category id
 * @state subcategory3
 */
export const subCategory3 = params => buildAction(typeReq(GET_CATEGORIES_4), params)

/**
 * @params query {string}
 * @state searchProduct
 */
export const search = params => buildAction(typeReq(SEARCH_PRODUCT), params)

/**
 * @param params are the same as the api query
 * @state filterProduct
 */
export const filter = params => buildAction(typeReq(FILTER_PRODUCT), params)

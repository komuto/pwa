import { buildAction, typeReq, typeReset, typeTemp } from '../config'

export const GET_PRODUCT = 'GET_PRODUCT'
export const LIST_PRODUCT_BY_CATEGORY = 'LIST_PRODUCT_BY_CATEGORY'
export const LIST_PRODUCT_BY_SEARCH = 'LIST_PRODUCT_BY_SEARCH'
export const ADD_TO_WISHLIST = 'ADD_TO_WISHLIST'
export const ADD_TO_WISHLIST_HOME = 'ADD_TO_WISHLIST_HOME'
export const GET_DISCUSSION = 'GET_DISCUSSION'
export const NEW_DISCUSSION = 'NEW_DISCUSSION'
export const GET_COMMENT = 'GET_COMMENT'
export const NEW_COMMENT = 'NEW_COMMENT'
export const REPORT_PRODUCT = 'REPORT_PRODUCT'
export const CREATE_PRODUCT = 'CREATE_PRODUCT'
export const HIDE_PRODUCTS = 'HIDE_PRODUCTS'
export const DELETE_PRODUCTS = 'DELETE_PRODUCTS'
export const CHANGE_CATALOG = 'CHANGE_CATALOG'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
export const GET_PRODUCT_EXPEDITIONS = 'GET_PRODUCT_EXPEDITIONS'
export const ADD_DROPSHIP_PRODUCTS = 'ADD_DROPSHIP_PRODUCTS'
export const GET_DROPSHIP_PRODUCTS = 'GET_DROPSHIP_PRODUCTS'
export const UPDATE_DROPSHIP_STATUS = 'UPDATE_DROPSHIP_STATUS'

/**
 * @params id {int} product id
 * @state productDetail
 */
export const getProduct = params => buildAction(typeReq(GET_PRODUCT), params)
export const resetDetail = () => buildAction(typeReset(GET_PRODUCT))

/**
 * @params id {int} product id
 * @state addWishlist
 */
export const addToWishlist = params => buildAction(typeReq(ADD_TO_WISHLIST), params)
export const resetAddToWishlist = () => buildAction(typeReset(ADD_TO_WISHLIST))

/**
 * @param id {int} product id
 * @state addWishlistHome
 */
export const addToWishlistHome = params => buildAction(typeReq(ADD_TO_WISHLIST_HOME), params)
export const resetAddToWishlistHome = () => buildAction(typeReset(ADD_TO_WISHLIST_HOME))

/**
 * @param params are the same as the api query
 * @state productByCategory
 */
export const listProductByCategory = params => buildAction(typeReq(LIST_PRODUCT_BY_CATEGORY), params)

/**
 * @param params are the same as the api query
 * @state productBySearch
 */
export const listProductBySearch = params => buildAction(typeReq(LIST_PRODUCT_BY_SEARCH), params)

/**
 * @params id {int} product id
 * @params params are the same as the api query
 * @state discussions
 */
export const getDiscussion = params => buildAction(typeReq(GET_DISCUSSION), params)

/**
 * @params id {int} product id
 * @params params are the same as the api
 * @state newDiscussion
 */
export const newDiscussion = params => buildAction(typeReq(NEW_DISCUSSION), params)
export const resetDiscussion = () => buildAction(typeReset(NEW_DISCUSSION))

/**
 * @params id {int} discussion id
 * @params params are the same as the api query
 * @state comments
 */
export const getComment = params => buildAction(typeReq(GET_COMMENT), params)

/**
 * @params id {int} discussion id
 * @params params are the same as the api
 * @state newComment
 */
export const newComment = params => buildAction(typeReq(NEW_COMMENT), params)
export const resetNewComment = () => buildAction(typeReset(NEW_COMMENT))

/**
 * @params id {int} product id
 * @param params are the same as the api
 * @state report
 */
export const reportProduct = params => buildAction(typeReq(REPORT_PRODUCT), params)

/**
 * @params product_ids {[int]}
 * @state alterProducts
 */
export const hideProducts = params => buildAction(typeReq(HIDE_PRODUCTS), params)

/**
 * @params product_ids {[int]}
 * @state alterProducts
 */
export const deleteProducts = params => buildAction(typeReq(DELETE_PRODUCTS), params)

/**
 * @param params are the same as the api
 * @state alterProducts
 */
export const createProduct = params => buildAction(typeReq(CREATE_PRODUCT), params)

/**
 * @param params are the same as the api
 * @state alterProducts
 */
export const changeCatalogProducts = params => buildAction(typeReq(CHANGE_CATALOG), params)

/**
 * @params id {int} product id
 * @param params are the same as the api
 * @state alterProducts
 */
export const updateProduct = params => buildAction(typeReq(UPDATE_PRODUCT), params)
export const resetAlterProduct = () => buildAction(typeReset(UPDATE_PRODUCT))

/**
 * @params id {int} product id
 * @state productExpeditions
 */
export const getProductExpeditions = params => buildAction(typeReq(GET_PRODUCT_EXPEDITIONS), params)

/**
 * @params id {int} product id
 * @state addDropshipProducts
 */
export const addDropshipProducts = params => buildAction(typeReq(ADD_DROPSHIP_PRODUCTS), params)

/**
 * @state tempCreateProduct
 */
export const tempCreateProduct = params => buildAction(typeTemp(CREATE_PRODUCT), params)

/**
 * @param params are the same as the api query
 * @state dropshipProducts
 */
export const getDropshipProducts = params => buildAction(typeReq(GET_DROPSHIP_PRODUCTS), params)

/**
 * @param params are the same as the api
 * @state alterProducts
 */
export const updateDropshipStatus = params => buildAction(typeReq(UPDATE_DROPSHIP_STATUS), params)

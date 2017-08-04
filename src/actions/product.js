import { buildAction, typeReq } from '../config'

export const GET_PRODUCT = 'GET_PRODUCT'
export const GET_PRODUCT_RESET = 'GET_PRODUCT_RESET'
export const LIST_PRODUCT_BY_CATEGORY = 'LIST_PRODUCT_BY_CATEGORY'
export const LIST_PRODUCT_BY_SEARCH = 'LIST_PRODUCT_BY_SEARCH'
export const ADD_TO_WISHLIST = 'ADD_TO_WISHLIST'
export const ADD_TO_WISHLIST_RESET = 'ADD_TO_WISHLIST_RESET'
export const ADD_TO_WISHLIST_HOME = 'ADD_TO_WISHLIST_HOME'
export const ADD_TO_WISHLIST_HOME_RESET = 'ADD_TO_WISHLIST_HOME_RESET'
export const GET_DISCUSSION = 'GET_DISCUSSION'
export const NEW_DISCUSSION = 'NEW_DISCUSSION'
export const NEW_DISCUSSION_RESET = 'NEW_DISCUSSION_RESET'
export const GET_COMMENT = 'GET_COMMENT'
export const NEW_COMMENT = 'NEW_COMMENT'
export const NEW_COMMENT_RESET = 'NEW_COMMENT_RESET'
export const REPORT_PRODUCT = 'REPORT_PRODUCT'
export const CREATE_PRODUCT = 'CREATE_PRODUCT'
export const HIDE_PRODUCTS = 'HIDE_PRODUCTS'
export const DELETE_PRODUCTS = 'DELETE_PRODUCTS'
export const CHANGE_CATALOG = 'CHANGE_CATALOG'

export const getProduct = params => buildAction(typeReq(GET_PRODUCT), params)
export const resetDetail = () => buildAction(GET_PRODUCT_RESET)
export const addToWishlist = params => buildAction(typeReq(ADD_TO_WISHLIST), params)
export const addToWishlistHome = params => buildAction(typeReq(ADD_TO_WISHLIST_HOME), params)
export const resetAddToWishlist = () => buildAction(ADD_TO_WISHLIST_RESET)
export const resetAddToWishlistHome = () => buildAction(ADD_TO_WISHLIST_HOME_RESET)
export const listProductByCategory = params => buildAction(typeReq(LIST_PRODUCT_BY_CATEGORY), params)
export const listProductBySearch = params => buildAction(typeReq(LIST_PRODUCT_BY_SEARCH), params)
export const getDiscussion = params => buildAction(typeReq(GET_DISCUSSION), params)
export const newDiscussion = params => buildAction(typeReq(NEW_DISCUSSION), params)
export const resetDiscussion = () => buildAction(NEW_DISCUSSION_RESET)
export const getComment = params => buildAction(typeReq(GET_COMMENT), params)
export const newComment = params => buildAction(typeReq(NEW_COMMENT), params)
export const resetNewComment = () => buildAction(NEW_COMMENT_RESET)
export const reportProduct = params => buildAction(typeReq(REPORT_PRODUCT), params)
export const hideProducts = params => buildAction(typeReq(HIDE_PRODUCTS), params)
export const deleteProducts = params => buildAction(typeReq(DELETE_PRODUCTS), params)
export const createProduct = params => buildAction(typeReq(CREATE_PRODUCT), params)
export const changeCatalogProducts = params => buildAction(typeReq(CHANGE_CATALOG), params)

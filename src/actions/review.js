import { buildAction, typeReq, typeReset } from '../config'

export const GET_REVIEWS = 'GET_REVIEWS'
export const ADD_REVIEW = 'ADD_REVIEW'
export const GET_BUYER_REVIEW = 'GET_BUYER_REVIEW'
export const GET_SELLER_REVIEW = 'GET_SELLER_REVIEW'

/**
 * @params id {int} product id
 * @params params are the same as the api query
 * @state productReview
 */
export const listReviews = params => buildAction(typeReq(GET_REVIEWS), params)

/**
 * @param id {int} product id
 * @params params are the same as the api
 * @state addReview
 */
export const addReview = params => buildAction(typeReq(ADD_REVIEW), params)
export const resetAddReview = () => buildAction(typeReset(ADD_REVIEW))

/**
 * @params params are the same as the api query
 * @state buyerReview
 */
export const getBuyerReview = (params) => buildAction(typeReq(GET_BUYER_REVIEW), params)

/**
 * @params params are the same as the api query
 * @state sellerReview
 */
export const getSellerReview = (params) => buildAction(typeReq(GET_SELLER_REVIEW), params)

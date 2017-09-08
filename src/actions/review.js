import { buildAction, typeReq, typeReset } from '../config'

export const GET_REVIEWS = 'GET_REVIEWS'
export const ADD_REVIEWS = 'ADD_REVIEWS'
export const GET_BUYER_REVIEW = 'GET_BUYER_REVIEW'
export const GET_SELLER_REVIEW = 'GET_SELLER_REVIEW'

/**
 * @params id {int} product id
 * @params params are the same as the api query
 * @state productReview
 */
export const listReviews = params => buildAction(typeReq(GET_REVIEWS), params)

/**
 * @params transId {int} transaction id
 * @params invoiceId {int}
 * @params reviews {[object]} array of review objects
 * @state addReviews
 */
export const addReviews = params => buildAction(typeReq(ADD_REVIEWS), params)
export const resetAddReviews = () => buildAction(typeReset(ADD_REVIEWS))

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

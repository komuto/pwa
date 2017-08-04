import { buildAction, typeReq } from '../config'

export const GET_REVIEWS = 'GET_REVIEWS'
export const ADD_REVIEW = 'ADD_REVIEW'
export const ADD_REVIEW_RESET = 'ADD_REVIEW_RESET'

export const listReviews = params => buildAction(typeReq(GET_REVIEWS), params)
export const addReview = params => buildAction(typeReq(ADD_REVIEW), params)
export const resetAddReview = () => buildAction(ADD_REVIEW_RESET)

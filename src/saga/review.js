import * as actions from '../actions/review'
import * as apis from '../api/review'
import { buildSaga } from '../config'

export const getReviews = buildSaga(apis.getReviews, actions.GET_REVIEWS)
export const addReview = buildSaga(apis.addReview, actions.ADD_REVIEW)
export const getBuyerReview = buildSaga(apis.getBuyerReview, actions.GET_BUYER_REVIEW)
export const getSellerReview = buildSaga(apis.getSellerReview, actions.GET_SELLER_REVIEW)

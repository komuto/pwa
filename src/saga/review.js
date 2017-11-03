import * as actions from '../actions/review'
import * as apis from '../api/review'
import { buildSaga } from '../config'

export const getReviews = buildSaga(apis.getReviews, actions.GET_REVIEWS)
export const addReviews = buildSaga(apis.addReviews, actions.ADD_REVIEWS)
export const getBuyerReview = buildSaga(apis.getBuyerReview, actions.GET_BUYER_REVIEW)
export const getSellerReview = buildSaga(apis.getSellerReview, actions.GET_SELLER_REVIEW)
export const getStoreReview = buildSaga(apis.getStoreReview, actions.GET_STORE_REVIEW)

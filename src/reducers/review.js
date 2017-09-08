import * as actions from '../actions/review'
import { buildInitState, createReducer } from '../config'

export const getReviews = createReducer(buildInitState({ reviews: [] }, true))
  .addReducer({
    type: actions.GET_REVIEWS,
    resultName: 'reviews'
  }).run()

export const addReviews = createReducer(buildInitState({ reviews: [] }))
  .addReducer({
    type: actions.ADD_REVIEWS,
    resultName: 'reviews',
    includeNonSaga: true
  }).run()

export const getBuyerReview = createReducer(buildInitState({ buyerReview: [] }, true))
  .addReducer({
    type: actions.GET_BUYER_REVIEW,
    resultName: 'buyerReview'
  }).run()

export const getSellerReview = createReducer(buildInitState({ sellerReview: [] }, true))
  .addReducer({
    type: actions.GET_SELLER_REVIEW,
    resultName: 'sellerReview'
  }).run()

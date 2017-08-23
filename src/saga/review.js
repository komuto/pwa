import * as actions from '../actions/review'
import * as apis from '../api/review'
import { buildSaga } from '../config'

export const getReviews = buildSaga(apis.getReviews, actions.GET_REVIEWS)
export const addReview = buildSaga(apis.addReview, actions.ADD_REVIEW)

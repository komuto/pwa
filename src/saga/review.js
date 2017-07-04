import { put } from 'redux-saga/effects'
import * as reviewActions from '../actions/review'
import * as reviewApi from '../api/review'
import { errorHandling } from '../config'

function * getReview (action) {
  try {
    const {data} = yield reviewApi.getReview(action)
    yield put({ type: reviewActions.GET_REVIEW_SUCCESS, ...data })
  } catch (e) {
    yield errorHandling(reviewActions.GET_REVIEW_FAILURE, e)
  }
}

function * addReview (action) {
  try {
    const {data} = yield reviewApi.addReview(action)
    yield put({ type: reviewActions.ADD_REVIEW_SUCCESS, ...data })
  } catch (e) {
    yield errorHandling(reviewActions.ADD_REVIEW_FAILURE, e)
  }
}

export {
  getReview,
  addReview
}

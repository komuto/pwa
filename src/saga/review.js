import { put } from 'redux-saga/effects'
import * as reviewActions from '../actions/review'
import * as reviewApi from '../api/review'
import { errorHandling, typeSucc, typeFail } from '../config'

function * getReviews (action) {
  try {
    const {data} = yield reviewApi.getReviews(action)
    yield put({ type: typeSucc(reviewActions.GET_REVIEWS), ...data })
  } catch (e) {
    yield errorHandling(typeFail(reviewActions.GET_REVIEWS), e)
  }
}

function * addReview (action) {
  try {
    const {data} = yield reviewApi.addReview(action)
    yield put({ type: typeSucc(reviewActions.ADD_REVIEW), ...data })
  } catch (e) {
    yield errorHandling(typeFail(reviewActions.ADD_REVIEW), e)
  }
}

export {
  getReviews,
  addReview
}

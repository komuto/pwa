import * as actions from '../actions/review'
import { buildReducer, buildType, initState } from '../config'

export const getReviews = (state = initState({ reviews: [] }, true), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.GET_REVIEWS:
      return buildReducer(state, action, type, 'reviews', true)
    default:
      return state
  }
}

export const addReview = (state = initState(), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.ADD_REVIEW:
      return buildReducer(state, action, type)
    case actions.ADD_REVIEW_RESET:
      return initState()
    default:
      return state
  }
}

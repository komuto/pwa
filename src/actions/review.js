export const GET_REVIEW_REQUEST = 'GET_REVIEW_REQUEST'
export const GET_REVIEW_SUCCESS = 'GET_REVIEW_SUCCESS'
export const GET_REVIEW_FAILURE = 'GET_REVIEW_FAILURE'

export const ADD_REVIEW_REQUEST = 'ADD_REVIEW_REQUEST'
export const ADD_REVIEW_SUCCESS = 'ADD_REVIEW_SUCCESS'
export const ADD_REVIEW_FAILURE = 'ADD_REVIEW_FAILURE'
export const ADD_REVIEW_RESET = 'ADD_REVIEW_RESET'

function getReview (params) {
  return {
    type: GET_REVIEW_REQUEST,
    ...params
  }
}

function addReview (params) {
  return {
    type: ADD_REVIEW_REQUEST,
    ...params
  }
}

function resetAddReview () {
  return {
    type: ADD_REVIEW_RESET
  }
}

export {
    getReview,
    addReview,
    resetAddReview
}

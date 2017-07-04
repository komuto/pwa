import * as reviewActions from '../actions/review'

const initReview = {
  reviews: [],
  message: '',
  status: '',
  isLoading: false,
  isFound: false,
  isOnline: true
}

const initAdd = {
  message: '',
  status: '',
  isLoading: false,
  isFound: false,
  isOnline: true
}

function getReview (state = initReview, action) {
  switch (action.type) {
    case reviewActions.GET_REVIEW_REQUEST:
      return {
        ...state,
        isLoading: true,
        message: '',
        status: 0
      }
    case reviewActions.GET_REVIEW_SUCCESS:
      return {
        ...state,
        reviews: action.data,
        message: action.message,
        status: action.code,
        isLoading: false,
        isFound: true,
        isOnline: true
      }
    case reviewActions.GET_REVIEW_FAILURE:
      return {
        ...state,
        message: action.message,
        status: action.code,
        isLoading: false,
        isFound: false,
        isOnline: action.isOnline
      }
    default:
      return state
  }
}

function addReview (state = initAdd, action) {
  switch (action.type) {
    case reviewActions.ADD_REVIEW_REQUEST:
      return {
        ...state,
        isLoading: true,
        message: '',
        status: 0
      }
    case reviewActions.ADD_REVIEW_SUCCESS:
      return {
        ...state,
        message: action.message,
        status: action.code,
        isLoading: false,
        isFound: true,
        isOnline: true
      }
    case reviewActions.ADD_REVIEW_FAILURE:
      return {
        ...state,
        message: action.message,
        status: action.code,
        isLoading: false,
        isFound: false,
        isOnline: action.isOnline
      }
    case reviewActions.ADD_REVIEW_RESET:
      return {
        ...state,
        message: '',
        status: 0,
        isLoading: false,
        isFound: false,
        isOnline: true
      }
    default:
      return state
  }
}

export {
    getReview,
    addReview
}

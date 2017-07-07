import * as actions from '../actions/email'

const initCheckEmail = {
  message: '',
  status: 0,
  isLoading: false,
  isFound: false,
  isOnline: true
}

function checkEmail (state = initCheckEmail, action) {
  switch (action.type) {
    case actions.CHECK_EMAILVALIDITY_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case actions.CHECK_EMAILVALIDITY_SUCCESS:
      return {
        ...state,
        message: action.message,
        status: action.code,
        isLoading: false,
        isFound: true,
        isOnline: true
      }
    case actions.CHECK_EMAILVALIDITY_FAILURE:
      return {
        ...state,
        message: action.data.email[0],
        status: action.code,
        isLoading: false,
        isFound: false,
        isOnline: action.isOnline
      }
    default:
      return state
  }
}

export {
  checkEmail
}

import * as storeActions from '../actions/stores'

const initStore = {
  store: [],
  message: '',
  status: 0,
  isLoading: false,
  isFound: false,
  isOnline: true
}

function stores (state = initStore, action) {
  switch (action.type) {
    case storeActions.GET_STORE_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case storeActions.GET_STORE_SUCCESS:
      return {
        ...state,
        store: action.data,
        message: action.message,
        status: action.code,
        isLoading: false,
        isFound: true,
        isOnline: true
      }
    case storeActions.GET_STORE_FAILURE:
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

export {
    stores
}

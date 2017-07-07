import * as actions from '../actions/address'

const initAddress = {
  address: '',
  message: '',
  status: 0,
  isLoading: false,
  isFound: false,
  isOnline: true
}

function address (state = initAddress, action) {
  switch (action.type) {
    case actions.ADD_ADDRESS_REQUEST:
      return {
        ...state,
        address: '',
        isLoading: true
      }
    case actions.UPDATE_ADDRESS_REQUEST:
      return {
        ...state,
        address: '',
        isLoading: true
      }
    case actions.DELETE_ADDRESS_REQUEST:
      return {
        ...state,
        address: '',
        isLoading: true
      }
    case actions.GET_ADDRESSDETAIL_REQUEST:
      return {
        ...state,
        address: '',
        isLoading: true
      }
    case actions.GET_LISTADDRESS_REQUEST:
      return {
        ...state,
        address: '',
        isLoading: true
      }
    case actions.RESET_STATUS_ADDRESS:
      return {
        ...state,
        status: 0
      }
    case actions.ADD_ADDRESS_SUCCESS:
      return {
        ...state,
        message: action.message,
        status: action.code,
        isLoading: false,
        isFound: true,
        isOnline: true
      }
    case actions.UPDATE_ADDRESS_SUCCESS:
      return {
        ...state,
        message: action.message,
        status: action.code,
        isLoading: false,
        isFound: true,
        isOnline: true
      }
    case actions.DELETE_ADDRESS_SUCCESS:
      return {
        ...state,
        message: action.message,
        status: action.code,
        isLoading: false,
        isFound: true,
        isOnline: true
      }
    case actions.GET_ADDRESSDETAIL_SUCCESS:
      return {
        ...state,
        address: action.data,
        message: action.message,
        status: action.code,
        isLoading: false,
        isFound: true,
        isOnline: true
      }
    case actions.GET_LISTADDRESS_SUCCESS:
      return {
        ...state,
        address: action.data,
        message: action.message,
        status: action.code,
        isLoading: false,
        isFound: true,
        isOnline: true
      }
    case actions.ADD_ADDRESS_FAILURE:
      return {
        ...state,
        message: action.message,
        status: action.code,
        isLoading: false,
        isFound: true,
        isOnline: action.isOnline
      }
    case actions.UPDATE_ADDRESS_FAILURE:
      return {
        ...state,
        message: action.message,
        status: action.code,
        isLoading: false,
        isFound: true,
        isOnline: action.isOnline
      }
    case actions.DELETE_ADDRESS_FAILURE:
      return {
        ...state,
        message: action.message,
        status: action.code,
        isLoading: false,
        isFound: true,
        isOnline: action.isOnline
      }
    case actions.GET_ADDRESSDETAIL_FAILURE:
      return {
        ...state,
        message: action.message,
        status: action.code,
        isLoading: false,
        isFound: true,
        isOnline: action.isOnline
      }
    case actions.GET_LISTADDRESS_FAILURE:
      return {
        ...state,
        message: action.message,
        status: action.code,
        isLoading: false,
        isFound: true,
        isOnline: action.isOnline
      }
    default:
      return state
  }
}

export {
  address
}

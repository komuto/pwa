import * as actions from '../actions/bank'

const initListBank = {
  banks: [],
  message: '',
  status: 0,
  isLoading: false,
  isFound: false,
  isOnline: true
}

const initBank = {
  bank: '',
  message: '',
  status: 0,
  isLoading: false,
  isFound: false,
  isOnline: true
}

function listBank (state = initListBank, action) {
  switch (action.type) {
    case actions.LIST_BANK_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case actions.LIST_BANK_SUCCESS:
      return {
        ...state,
        banks: action.data,
        message: action.message,
        status: action.status,
        isLoading: false,
        isFound: true,
        isOnline: true
      }
    case actions.LIST_BANK_FAILURE:
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

function getBank (state = initBank, action) {
  switch (action.type) {
    case actions.GET_BANK_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case actions.GET_BANK_SUCCESS:
      return {
        ...state,
        bank: action.data,
        message: action.message,
        status: action.code,
        isLoading: false,
        isFound: true,
        isOnline: true
      }
    case actions.GET_BANK_FAILURE:
      return {
        ...state,
        message: action.message,
        status: action.code,
        isLoading: false,
        isFound: false,
        isOnline: actions.isOnline
      }
    default:
      return state
  }
}

export {
  listBank,
  getBank
}

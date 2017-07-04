import * as productActions from '../actions/product'

const initDetailProduct = {
  detail: [],
  message: '',
  status: '',
  isLoading: false,
  isFound: false,
  isOnline: true
}

function getProduct (state = initDetailProduct, action) {
  switch (action.type) {
    case productActions.GET_PRODUCT_REQUEST:
      return {
        ...state,
        isLoading: true,
        message: '',
        status: 0,
        isFound: false,
        isOnline: true
      }
    case productActions.GET_PRODUCT_SUCCESS:
      return {
        ...state,
        detail: action.data,
        message: action.message,
        status: action.code,
        isLoading: false,
        isOnline: true,
        isFound: true
      }
    case productActions.GET_PRODUCT_FAILURE:
      return {
        ...state,
        message: action.message,
        status: action.code,
        isLoading: false,
        isOnline: action.isOnline,
        isFound: false
      }
    default:
      return state
  }
}

export {
    getProduct
}

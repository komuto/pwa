import * as productActions from '../actions/product'

const initDetailProduct = {
  detail: [],
  message: '',
  status: '',
  isLoading: false,
  isFound: false,
  isOnline: true
}

const initProduct = {
  products: [],
  message: '',
  status: 0,
  isLoading: false,
  isOnline: true,
  isFound: false
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

function productByCategory (state = initProduct, action) {
  switch (action.type) {
    case productActions.LIST_PRODUCTBYCATEGORY_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case productActions.LIST_PRODUCTBYCATEGORY_SUCCESS:
      return {
        ...state,
        products: action.data,
        message: action.message,
        status: action.code,
        isOnline: true,
        isLoading: false,
        isFound: true
      }
    case productActions.LIST_PRODUCTBYCATEGORY_FAILURE:
      return {
        ...state,
        message: action.message,
        status: action.code,
        isLoading: false,
        isOnline: action.isOnline
      }
    default:
      return state
  }
}

function productBySearch (state = initProduct, action) {
  switch (action.type) {
    case productActions.LIST_PRODUCTBYSEARCH_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case productActions.LIST_PRODUCTBYSEARCH_SUCCESS:
      return {
        ...state,
        products: action.data,
        message: action.message,
        status: action.code,
        isOnline: true,
        isLoading: false,
        isFound: true
      }
    case productActions.LIST_PRODUCTBYSEARCH_FAILURE:
      return {
        ...state,
        message: action.message,
        status: action.code,
        isLoading: false,
        isOnline: action.isOnline
      }
    default:
      return state
  }
}

export {
    getProduct,
    productByCategory,
    productBySearch
}

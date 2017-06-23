import * as homeActions from '../actions/home'

const initCategory = {
  categories: [],
  message: '',
  status: '',
  isLoading: false,
  isOnline: true,
  isFound: false
}

const initProduct = {
  products: [],
  message: '',
  status: 0,
  isLoading: false,
  isOnline: true,
  isFound: false
}

function product (state = initProduct, action) {
  switch (action.type) {
    case homeActions.HOME_PRODUCT_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case homeActions.HOME_PRODUCT_SUCCESS:
      return {
        ...state,
        products: action.data,
        message: action.message,
        status: action.code,
        isOnline: true,
        isLoading: false,
        isFound: true
      }
    case homeActions.HOME_PRODUCT_FAILURE:
      return {
        ...state,
        message: action.message,
        status: action.code,
        isLoading: false,
        isOnline: action.isOnline
      }
    case homeActions.SEARCH_PRODUCT_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case homeActions.SEARCH_PRODUCT_SUCCESS:
      return {
        ...state,
        products: action.data,
        message: action.message,
        status: action.code,
        isOnline: true,
        isLoading: false,
        isFound: true
      }
    case homeActions.SEARCH_PRODUCT_FAILURE:
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

function categoryList (state = initCategory, action) {
  switch (action.type) {
    case homeActions.HOME_CATEGORY_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case homeActions.HOME_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: action.data,
        message: action.message,
        status: action.code,
        isOnline: true,
        isLoading: false,
        isFound: true
      }
    case homeActions.HOME_CATEGORY_FAILURE:
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

function subCategory (state = initCategory, action) {
  switch (action.type) {
    case homeActions.RESET_STATUS_SUBCATEGORY:
      return {
        ...state,
        categories: [],
        message: '',
        status: 0,
        isLoading: false,
        isFound: false,
        isOnline: true
      }
    case homeActions.HOME_SUBCATEGORY_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case homeActions.HOME_SUBCATEGORY_SUCCESS:
      return {
        ...state,
        categories: action.data,
        message: action.message,
        status: action.code,
        isOnline: true,
        isLoading: false,
        isFound: true
      }
    case homeActions.HOME_SUBCATEGORY_FAILURE:
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
  product,
  categoryList,
  subCategory
}

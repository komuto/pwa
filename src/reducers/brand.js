import * as brandActions from '../actions/brand'

const initBrand = {
  brands: [],
  message: '',
  status: 0,
  isLoading: false,
  isFound: false,
  isOnline: true
}

function brand (state = initBrand, action) {
  switch (action.type) {
    case brandActions.GET_BRAND_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case brandActions.GET_BRAND_SUCCESS:
      return {
        ...state,
        brands: action.data,
        message: action.message,
        status: action.code,
        isLoading: false,
        isOnline: true,
        isFound: true
      }
    case brandActions.GET_BRAND_FAILURE:
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

function brandByCategory (state = initBrand, action) {
  switch (action.type) {
    case brandActions.BRAND_BYCATEGORY_REQUEST:
      return {
        ...state,
        isLoading: true,
        message: '',
        status: 0
      }
    case brandActions.BRAND_BYCATEGORY_SUCCESS:
      return {
        ...state,
        brands: action.data,
        message: action.message,
        status: action.code,
        isLoading: false,
        isFound: true,
        isOnline: true
      }
    case brandActions.BRAND_BYCATEGORY_FAILURE:
      return {
        ...state,
        brands: [],
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
  brand,
  brandByCategory
}

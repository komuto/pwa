import * as brandActions from '../actions/brand'

const initBrand = {
  brands: [],
  message: '',
  status: 0,
  isLoading: false,
  isFound: false,
  isError: false
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
        isFound: true
      }
    case brandActions.GET_BRAND_FAILURE:
      return {
        ...state,
        message: action.message,
        status: action.code,
        isLoading: false,
        isError: true
      }
    default:
      return state
  }
}

export {
  brand
}

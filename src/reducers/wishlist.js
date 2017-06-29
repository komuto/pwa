import * as wishlistAction from '../actions/wishlist'

const initWishlist = {
  status: '',
  message: '',
  wishlist: [],
  isOnline: true,
  isFound: false,
  isLoading: false
}

function wishlist (state = initWishlist, action) {
  switch (action.type) {
    case wishlistAction.GET_WISHLIST_REQUEST:
      return {
        ...state,
        message: '',
        status: '',
        wishlist: [],
        isOnline: true,
        isLoading: true,
        isFound: false
      }
    case wishlistAction.GET_WISHLIST_SUCCESS:
      return {
        ...state,
        message: action.message,
        status: action.code,
        wishlist: action.data,
        isOnline: true,
        isFound: true,
        isLoading: false
      }
    case wishlistAction.GET_WISHLIST_FAILURE:
      return {
        ...state,
        message: action.message,
        status: action.code,
        wishlist: [],
        isOnline: action.isOnline,
        isFound: false,
        isLoading: false
      }
    default:
      return state
  }
}

export {
    wishlist
}

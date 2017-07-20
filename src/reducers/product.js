import * as productActions from '../actions/product'

const initDetailProduct = {
  detail: {},
  message: '',
  status: '',
  isLoading: false,
  isFound: false,
  isOnline: true
}

const initNewDiscussion = {
  discussion: {},
  message: '',
  status: '',
  isLoading: false,
  isFound: false,
  isOnline: true
}

const initComment = {
  comments: [],
  message: '',
  status: '',
  isLoading: false,
  isFound: false,
  isOnline: true
}

const initNewComment = {
  comment: {},
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

const initDiscussion = {
  discussions: [],
  message: '',
  status: '',
  isLoading: false,
  isFound: false,
  isOnline: true
}

const initAddWishlist = {
  wishlist: [],
  message: '',
  status: 0,
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
    case productActions.GET_PRODUCT_RESET:
      return {
        ...state,
        status: 0
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

function addToWishlist (state = initAddWishlist, action) {
  switch (action.type) {
    case productActions.ADDTO_WISHLIST_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case productActions.ADDTO_WISHLIST_SUCCESS:
      return {
        ...state,
        wishlist: action.data,
        message: action.message,
        status: action.code,
        isOnline: true,
        isLoading: false,
        isFound: true
      }
    case productActions.ADDTO_WISHLIST_FAILURE:
      return {
        ...state,
        message: action.message,
        status: action.code,
        isLoading: false,
        isOnline: action.isOnline
      }
    case productActions.ADDTO_WISHLIST_RESET:
      return {
        ...state,
        status: 0
      }
    default:
      return state
  }
}

function addToWishlistHome (state = initAddWishlist, action) {
  switch (action.type) {
    case productActions.ADDTO_WISHLISTHOME_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case productActions.ADDTO_WISHLISTHOME_SUCCESS:
      return {
        ...state,
        wishlist: action.data,
        message: action.message,
        status: action.code,
        isOnline: true,
        isLoading: false,
        isFound: true
      }
    case productActions.ADDTO_WISHLISTHOME_FAILURE:
      return {
        ...state,
        message: action.message,
        status: action.code,
        isLoading: false,
        isOnline: action.isOnline
      }
    case productActions.ADDTO_WISHLISTHOME_RESET:
      return {
        ...state,
        status: 0
      }
    default:
      return state
  }
}

function getDiscussion (state = initDiscussion, action) {
  switch (action.type) {
    case productActions.GET_DISCUSSION_REQUEST:
      return {
        ...state,
        discussions: [],
        isLoading: true
      }
    case productActions.GET_DISCUSSION_SUCCESS:
      return {
        ...state,
        discussions: action.data,
        message: action.message,
        status: action.code,
        isOnline: true,
        isLoading: false,
        isFound: true
      }
    case productActions.GET_DISCUSSION_FAILURE:
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

function newDiscussion (state = initNewDiscussion, action) {
  switch (action.type) {
    case productActions.NEW_DISCUSSION_REQUEST:
      return {
        ...state,
        isLoading: true,
        message: '',
        status: 0,
        isFound: false,
        isOnline: true
      }
    case productActions.NEW_DISCUSSION_SUCCESS:
      return {
        ...state,
        discussion: action.data,
        message: action.message,
        status: action.code,
        isLoading: false,
        isOnline: true,
        isFound: true
      }
    case productActions.NEW_DISCUSSION_FAILURE:
      return {
        ...state,
        message: action.message,
        status: action.code,
        isLoading: false,
        isOnline: action.isOnline,
        isFound: false
      }
    case productActions.NEW_DISCUSSION_RESET:
      return {
        ...state,
        status: 0
      }
    default:
      return state
  }
}

function getComment (state = initComment, action) {
  switch (action.type) {
    case productActions.GET_COMMENT_REQUEST:
      return {
        ...state,
        comments: [],
        isLoading: true,
        message: '',
        status: 0,
        isFound: false,
        isOnline: true
      }
    case productActions.GET_COMMENT_SUCCESS:
      return {
        ...state,
        comments: action.data,
        message: action.message,
        status: action.code,
        isLoading: false,
        isOnline: true,
        isFound: true
      }
    case productActions.GET_COMMENT_FAILURE:
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

function newComment (state = initNewComment, action) {
  switch (action.type) {
    case productActions.NEW_COMMENT_REQUEST:
      return {
        ...state,
        isLoading: true,
        message: '',
        status: 0,
        isFound: false,
        isOnline: true
      }
    case productActions.NEW_COMMENT_SUCCESS:
      return {
        ...state,
        comment: action.data,
        message: action.message,
        status: action.code,
        isLoading: false,
        isOnline: true,
        isFound: true
      }
    case productActions.NEW_COMMENT_FAILURE:
      return {
        ...state,
        message: action.message,
        status: action.code,
        isLoading: false,
        isOnline: action.isOnline,
        isFound: false
      }
    case productActions.NEW_COMMENT_RESET:
      return {
        ...state,
        status: 0
      }
    default:
      return state
  }
}

export {
    getProduct,
    productByCategory,
    productBySearch,
    addToWishlist,
    addToWishlistHome,
    getDiscussion,
    newDiscussion,
    getComment,
    newComment
}

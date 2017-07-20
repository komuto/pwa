export const GET_PRODUCT_REQUEST = 'GET_PRODUCT_REQUEST'
export const GET_PRODUCT_SUCCESS = 'GET_PRODUCT_SUCCESS'
export const GET_PRODUCT_FAILURE = 'GET_PRODUCT_FAILURE'
export const GET_PRODUCT_RESET = 'GET_PRODUCT_RESET'

export const LIST_PRODUCTBYCATEGORY_REQUEST = 'LIST_PRODUCTBYCATEGORY_REQUEST'
export const LIST_PRODUCTBYCATEGORY_SUCCESS = 'LIST_PRODUCTBYCATEGORY_SUCCESS'
export const LIST_PRODUCTBYCATEGORY_FAILURE = 'LIST_PRODUCTBYCATEGORY_FAILURE'

export const LIST_PRODUCTBYSEARCH_REQUEST = 'LIST_PRODUCTBYSEARCH_REQUEST'
export const LIST_PRODUCTBYSEARCH_SUCCESS = 'LIST_PRODUCTBYSEARCH_SUCCESS'
export const LIST_PRODUCTBYSEARCH_FAILURE = 'LIST_PRODUCTBYSEARCH_FAILURE'

export const ADDTO_WISHLIST_REQUEST = 'ADDTO_WISHLIST_REQUEST'
export const ADDTO_WISHLIST_SUCCESS = 'ADDTO_WISHLIST_SUCCESS'
export const ADDTO_WISHLIST_FAILURE = 'ADDTO_WISHLIST_FAILURE'
export const ADDTO_WISHLIST_RESET = 'ADDTO_WISHLIST_RESET'

export const ADDTO_WISHLISTHOME_REQUEST = 'ADDTO_WISHLISTHOME_REQUEST'
export const ADDTO_WISHLISTHOME_SUCCESS = 'ADDTO_WISHLISTHOME_SUCCESS'
export const ADDTO_WISHLISTHOME_FAILURE = 'ADDTO_WISHLISTHOME_FAILURE'
export const ADDTO_WISHLISTHOME_RESET = 'ADDTO_WISHLISTHOME_RESET'

export const GET_DISCUSSION_REQUEST = 'GET_DISCUSSION_REQUEST'
export const GET_DISCUSSION_SUCCESS = 'GET_DISCUSSION_SUCCESS'
export const GET_DISCUSSION_FAILURE = 'GET_DISCUSSION_FAILURE'

export const NEW_DISCUSSION_REQUEST = 'NEW_DISCUSSION_REQUEST'
export const NEW_DISCUSSION_SUCCESS = 'NEW_DISCUSSION_SUCCESS'
export const NEW_DISCUSSION_FAILURE = 'NEW_DISCUSSION_FAILURE'
export const NEW_DISCUSSION_RESET = 'NEW_DISCUSSION_RESET'

export const GET_COMMENT_REQUEST = 'GET_COMMENT_REQUEST'
export const GET_COMMENT_SUCCESS = 'GET_COMMENT_SUCCESS'
export const GET_COMMENT_FAILURE = 'GET_COMMENT_FAILURE'

export const NEW_COMMENT_REQUEST = 'NEW_COMMENT_REQUEST'
export const NEW_COMMENT_SUCCESS = 'NEW_COMMENT_SUCCESS'
export const NEW_COMMENT_FAILURE = 'NEW_COMMENT_FAILURE'
export const NEW_COMMENT_RESET = 'NEW_COMMENT_RESET'

function getProduct (params) {
  return {
    type: GET_PRODUCT_REQUEST,
    ...params
  }
}

function resetDetail () {
  return {
    type: GET_PRODUCT_RESET
  }
}

function addToWishlist (params) {
  return {
    type: ADDTO_WISHLIST_REQUEST,
    ...params
  }
}

function addToWishlistHome (params) {
  return {
    type: ADDTO_WISHLISTHOME_REQUEST,
    ...params
  }
}

function resetAddToWishlist () {
  return {
    type: ADDTO_WISHLIST_RESET
  }
}

function resetAddToWishlistHome () {
  return {
    type: ADDTO_WISHLISTHOME_RESET
  }
}

function listProductByCategory (params) {
  return {
    type: LIST_PRODUCTBYCATEGORY_REQUEST,
    ...params
  }
}

function listProductBySearch (params) {
  return {
    type: LIST_PRODUCTBYSEARCH_REQUEST,
    ...params
  }
}

function getDiscussion (params) {
  return {
    type: GET_DISCUSSION_REQUEST,
    ...params
  }
}

function newDiscussion (params) {
  return {
    type: NEW_DISCUSSION_REQUEST,
    ...params
  }
}

function resetDiscussion () {
  return {
    type: NEW_DISCUSSION_RESET
  }
}

function getComment (params) {
  return {
    type: GET_COMMENT_REQUEST,
    ...params
  }
}

function newComment (params) {
  return {
    type: NEW_COMMENT_REQUEST,
    ...params
  }
}

function resetNewComment () {
  return {
    type: NEW_COMMENT_RESET
  }
}

export {
    getProduct,
    resetDetail,
    addToWishlist,
    addToWishlistHome,
    resetAddToWishlist,
    resetAddToWishlistHome,
    listProductByCategory,
    listProductBySearch,
    getDiscussion,
    newDiscussion,
    resetDiscussion,
    getComment,
    newComment,
    resetNewComment
}

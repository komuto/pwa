import * as actions from '../actions/product'
import { buildReducer, initState, buildType } from '../config'

const initDetailProduct = {
  detail: {},
  ...initState()
}

const initNewDiscussion = {
  discussion: {},
  ...initState()
}

const initNewComment = {
  comment: {},
  ...initState()
}

const initAddWishlist = {
  wishlist: [],
  ...initState()
}

const initReport = {
  report: {},
  ...initState()
}

const initAlterProduct = {
  product: {},
  ...initState()
}

function getProduct (state = initDetailProduct, action) {
  const type = buildType(action.type)
  switch (type) {
    case actions.GET_PRODUCT:
      return buildReducer(state, action, type, 'detail')
    case actions.GET_PRODUCT_RESET:
      return { ...state, status: 0 }
    default:
      return state
  }
}

function productByCategory (state = initState({ products: [] }, true), action) {
  const type = buildType(action.type)
  switch (type) {
    case actions.LIST_PRODUCT_BY_CATEGORY:
      return buildReducer(state, action, type, 'products', true)
    default:
      return state
  }
}

function productBySearch (state = initState({ products: [] }, true), action) {
  const type = buildType(action.type)
  switch (type) {
    case actions.LIST_PRODUCT_BY_SEARCH:
      return buildReducer(state, action, type, 'products', true)
    default:
      return state
  }
}

function addToWishlist (state = initAddWishlist, action) {
  const type = buildType(action.type)
  switch (type) {
    case actions.ADD_TO_WISHLIST:
      return buildReducer(state, action, type, 'wishlist')
    case actions.ADD_TO_WISHLIST_RESET:
      return initAddWishlist
    default:
      return state
  }
}

function addToWishlistHome (state = initAddWishlist, action) {
  const type = buildType(action.type)
  switch (type) {
    case actions.ADD_TO_WISHLIST_HOME:
      return buildReducer(state, action, type, 'wishlist')
    case actions.ADD_TO_WISHLIST_HOME_RESET:
      return initAddWishlist
    default:
      return state
  }
}

function getDiscussion (state = initState({ discussions: [] }, true), action) {
  const type = buildType(action.type)
  switch (type) {
    case actions.GET_DISCUSSION:
      return buildReducer(state, action, type, 'discussions', true)
    default:
      return state
  }
}

function newDiscussion (state = initNewDiscussion, action) {
  const type = buildType(action.type)
  switch (type) {
    case actions.NEW_DISCUSSION:
      return buildReducer(state, action, type, 'discussion')
    case actions.NEW_DISCUSSION_RESET:
      return initNewDiscussion
    default:
      return state
  }
}

function getComment (state = initState({ comments: [] }, true), action) {
  const type = buildType(action.type)
  switch (type) {
    case actions.GET_COMMENT:
      return buildReducer(state, action, type, 'comments', true)
    default:
      return state
  }
}

function newComment (state = initNewComment, action) {
  const type = buildType(action.type)
  switch (type) {
    case actions.NEW_COMMENT:
      return buildReducer(state, action, type, 'comment')
    case actions.NEW_COMMENT_RESET:
      return initNewComment
    default:
      return state
  }
}

function reportProduct (state = initReport, action) {
  const type = buildType(action.type)
  switch (type) {
    case actions.REPORT_PRODUCT:
      return buildReducer(state, action, type, 'report')
    default:
      return state
  }
}

export const alterProducts = (state = initAlterProduct, action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.CREATE_PRODUCT:
      return buildReducer(state, action, type, 'product')
    case actions.HIDE_PRODUCTS:
      return buildReducer(state, action, type)
    case actions.DELETE_PRODUCTS:
      return buildReducer(state, action, type)
    case actions.CHANGE_CATALOG:
      return buildReducer(state, action, type)
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
    newComment,
    reportProduct
}

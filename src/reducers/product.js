import * as actions from '../actions/product'
import { buildReducer, initState, buildType } from '../config'

const initTempCreateProduct = {
  stepOne: {
    isFound: false
  },
  stepTwo: {
    isFound: false
  },
  stepThree: {
    isFound: false
  },
  stepFour: {
    isFound: false
  }
}

export const getProduct = (state = initState({ detail: {} }), action) => {
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

export const productByCategory = (state = initState({ products: [] }, true), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.LIST_PRODUCT_BY_CATEGORY:
      return buildReducer(state, action, type, 'products', true)
    default:
      return state
  }
}

export const productBySearch = (state = initState({ products: [] }, true), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.LIST_PRODUCT_BY_SEARCH:
      return buildReducer(state, action, type, 'products', true)
    default:
      return state
  }
}

export const addToWishlist = (state = initState({ wishlist: [] }), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.ADD_TO_WISHLIST:
      return buildReducer(state, action, type, 'wishlist')
    case actions.ADD_TO_WISHLIST_RESET:
      return initState({ wishlist: [] })
    default:
      return state
  }
}

export const addToWishlistHome = (state = initState({ wishlist: [] }), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.ADD_TO_WISHLIST_HOME:
      return buildReducer(state, action, type, 'wishlist')
    case actions.ADD_TO_WISHLIST_HOME_RESET:
      return initState({ wishlist: [] })
    default:
      return state
  }
}

export const getDiscussion = (state = initState({ discussions: [] }, true), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.GET_DISCUSSION:
      return buildReducer(state, action, type, 'discussions', true)
    default:
      return state
  }
}

export const newDiscussion = (state = initState({ discussion: {} }), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.NEW_DISCUSSION:
      return buildReducer(state, action, type, 'discussion')
    case actions.NEW_DISCUSSION_RESET:
      return initState({ discussion: {} })
    default:
      return state
  }
}

export const getComment = (state = initState({ comments: [] }, true), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.GET_COMMENT:
      return buildReducer(state, action, type, 'comments', true)
    default:
      return state
  }
}

export const newComment = (state = initState({ comment: {} }), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.NEW_COMMENT:
      return buildReducer(state, action, type, 'comment')
    case actions.NEW_COMMENT_RESET:
      return initState({ comment: {} })
    default:
      return state
  }
}

export const reportProduct = (state = initState({ report: {} }), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.REPORT_PRODUCT:
      return buildReducer(state, action, type, 'report')
    default:
      return state
  }
}

export const alterProducts = (state = initState({ product: {} }), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.CREATE_PRODUCT:
      return { ...buildReducer(state, action, type, 'product'), type: 'create' }
    case actions.HIDE_PRODUCTS:
      return { ...buildReducer(state, action, type), type: 'hide' }
    case actions.DELETE_PRODUCTS:
      return { ...buildReducer(state, action, type), type: 'delete' }
    case actions.CHANGE_CATALOG:
      return { ...buildReducer(state, action, type), type: 'change' }
    case actions.UPDATE_PRODUCT:
      return { ...buildReducer(state, action, type, 'product'), type: 'update' }
    case actions.ALTER_PRODUCT_RESET:
      return initState({ product: {} })
    default:
      return state
  }
}

export const getProductExpeditions = (state = initState({ productExpeditions: [] }), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.GET_PRODUCT_EXPEDITIONS:
      return buildReducer(state, action, type, 'productExpeditions')
    default:
      return state
  }
}

export const addDropshipProducts = (state = initState({ addDropshipProducts: {} }), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.ADD_DROPSHIP_PRODUCTS:
      return buildReducer(state, action, type, 'addDropshipProducts')
    default:
      return state
  }
}

export const tempCreateProduct = (state = initTempCreateProduct, { type, ...temp }) => {
  switch (type) {
    case actions.TEMP_CREATE_PRODUCT:
      return { ...state, ...temp }
    default:
      return state
  }
}


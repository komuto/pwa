import * as actions from '../actions/product'
import { buildInitState, createReducer } from '../config'

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

export const getProduct = createReducer(buildInitState({ detail: {} }))
  .addReducer({
    type: actions.GET_PRODUCT,
    resultName: 'detail',
    includeNonSaga: true,
    resetPrevState: { state: 0 }
  })
  .addReducer({
    type: actions.GET_DROPSHIP_PRODUCT_FOR_ADD,
    resultName: 'detail'
  })
  .addReducer({
    type: actions.GET_DROPSHIP_PRODUCT_FOR_MANAGE,
    resultName: 'detail'
  }).run()

export const productByCategory = createReducer(buildInitState({ products: [] }, true))
  .addReducer({
    type: actions.LIST_PRODUCT_BY_CATEGORY,
    resultName: 'products'
  }).run()

export const productBySearch = createReducer(buildInitState({ products: [] }, true))
  .addReducer({
    type: actions.LIST_PRODUCT_BY_SEARCH,
    resultName: 'products'
  }).run()

export const addToWishlist = createReducer(buildInitState({ wishlist: [] }))
  .addReducer({
    type: actions.ADD_TO_WISHLIST,
    resultName: 'wishlist',
    includeNonSaga: true
  }).run()

export const addToWishlistHome = createReducer(buildInitState({ wishlist: [] }))
  .addReducer({
    type: actions.ADD_TO_WISHLIST_HOME,
    resultName: 'wishlist',
    includeNonSaga: true
  }).run()

export const getDiscussion = createReducer(buildInitState({ discussions: [] }, true))
  .addReducer({
    type: actions.GET_DISCUSSION,
    resultName: 'discussions'
  }).run()

export const newDiscussion = createReducer(buildInitState({ discussion: {} }))
  .addReducer({
    type: actions.NEW_DISCUSSION,
    resultName: 'discussion',
    includeNonSaga: true
  }).run()

export const getComment = createReducer(buildInitState({ comments: [] }, true))
  .addReducer({
    type: actions.GET_COMMENT,
    resultName: 'comments'
  }).run()

export const newComment = createReducer(buildInitState({ comment: {} }))
  .addReducer({
    type: actions.NEW_COMMENT,
    resultName: 'comment',
    includeNonSaga: true
  }).run()

export const reportProduct = createReducer(buildInitState({ report: {} }))
  .addReducer({
    type: actions.REPORT_PRODUCT,
    resultName: 'report'
  }).run()

export const alterProducts = createReducer(buildInitState({ product: {} }))
  .addReducer({
    type: actions.CREATE_PRODUCT,
    resultName: 'product',
    add: { type: 'create' }
  })
  .addReducer({
    type: actions.HIDE_PRODUCTS,
    add: { type: 'hide' }
  })
  .addReducer({
    type: actions.DELETE_PRODUCTS,
    add: { type: 'delete' }
  })
  .addReducer({
    type: actions.CHANGE_CATALOG,
    add: { type: 'change' }
  })
  .addReducer({
    type: actions.UPDATE_PRODUCT,
    resultName: 'product',
    add: { type: 'update' },
    includeNonSaga: true
  })
  .addReducer({
    type: actions.UPDATE_DROPSHIP_STATUS,
    add: { type: 'dropship_status' }
  })
  .addReducer({
    type: actions.DELETE_DROPSHIP,
    add: { type: 'delete_dropship' }
  }).run()

export const getProductExpeditions = createReducer(buildInitState({ productExpeditions: [] }))
  .addReducer({
    type: actions.GET_PRODUCT_EXPEDITIONS,
    resultName: 'productExpeditions'
  }).run()

export const addDropshipProducts = createReducer(buildInitState({ addDropshipProducts: {} }))
  .addReducer({
    type: actions.ADD_DROPSHIP_PRODUCTS,
    resultName: 'addDropshipProducts'
  }).run()

export const tempCreateProduct = createReducer(initTempCreateProduct)
  .addReducer({
    type: actions.CREATE_PRODUCT,
    includeNonSaga: true
  }).run()

export const getDropshipProducts = createReducer(buildInitState({ products: [] }, true))
  .addReducer({
    type: actions.GET_DROPSHIP_PRODUCTS,
    resultName: 'products'
  }).run()

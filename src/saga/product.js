import * as actions from '../actions/product'
import * as apis from '../api/product'
import { buildSaga, buildSagaDelay } from '../config'

export const productByCategory = buildSagaDelay([], apis.getProductBy, actions.LIST_PRODUCT_BY_CATEGORY)
export const productBySearch = buildSagaDelay([], apis.getProductBy, actions.LIST_PRODUCT_BY_SEARCH)
export const getProduct = buildSaga(['id'], apis.getProduct, actions.GET_PRODUCT)
export const addToWishlist = buildSaga(['id'], apis.addToWishlist, actions.ADD_TO_WISHLIST)
export const getDiscussion = buildSaga([], apis.getDiscussion, actions.GET_DISCUSSION)
export const newDiscussion = buildSaga([], apis.newDiscussion, actions.NEW_DISCUSSION)
export const newComment = buildSaga([], apis.newComment, actions.NEW_COMMENT)
export const getComment = buildSaga([], apis.getComment, actions.GET_COMMENT)
export const reportProduct = buildSaga([], apis.reportProduct, actions.REPORT_PRODUCT)
export const createProduct = buildSaga([], apis.createProduct, actions.CREATE_PRODUCT)
export const hideProducts = buildSaga(['product_ids'], apis.hideProducts, actions.HIDE_PRODUCTS)
export const deleteProducts = buildSaga(['product_ids'], apis.deleteProducts, actions.DELETE_PRODUCTS)
export const changeCatalogProducts = buildSaga(['catalog_id', 'product_ids'], apis.changeCatalogProducts, actions.CHANGE_CATALOG)

import * as actions from '../actions/product'
import * as apis from '../api/product'
import { buildSaga, buildSagaDelay, getState } from '../config'

export const productByCategory = buildSagaDelay(apis.getProductBy, actions.LIST_PRODUCT_BY_CATEGORY)
export const productBySearch = buildSagaDelay(apis.getProductBy, actions.LIST_PRODUCT_BY_SEARCH)
export const getProduct = buildSaga(apis.getProduct, actions.GET_PRODUCT)
export const addToWishlist = buildSaga(apis.addToWishlist, actions.ADD_TO_WISHLIST)
export const addToWishlistHome = buildSaga(apis.addToWishlist, actions.ADD_TO_WISHLIST_HOME)
export const getDiscussion = buildSaga(apis.getDiscussion, actions.GET_DISCUSSION)
export const newDiscussion = buildSaga(apis.newDiscussion, actions.NEW_DISCUSSION)
export const newComment = buildSaga(apis.newComment, actions.NEW_COMMENT)
export const getComment = buildSaga(apis.getComment, actions.GET_COMMENT)
export const reportProduct = buildSaga(apis.reportProduct, actions.REPORT_PRODUCT)
export const createProduct = buildSaga(apis.createProduct, actions.CREATE_PRODUCT)
export const hideProducts = buildSaga(apis.hideProducts, actions.HIDE_PRODUCTS)
export const deleteProducts = buildSaga(apis.deleteProducts, actions.DELETE_PRODUCTS)
export const changeCatalogProducts = buildSaga(apis.changeCatalogProducts, actions.CHANGE_CATALOG)
export const updateProduct = buildSaga(apis.updateProduct, actions.UPDATE_PRODUCT)
export const getProductExpeditions = buildSaga(apis.getProductExpeditions, actions.GET_PRODUCT_EXPEDITIONS)
export const addDropshipProducts = buildSaga(apis.addDropshipProducts, actions.ADD_DROPSHIP_PRODUCTS)
export const getDropshipProducts = buildSaga(apis.getDropshipProducts, actions.GET_DROPSHIP_PRODUCTS)
export const updateDropshipStatus = buildSaga(apis.updateDropshipStatus, actions.UPDATE_DROPSHIP_STATUS)
export const getDropshipProductForAdd = buildSaga(apis.getProduct, actions.GET_DROPSHIP_PRODUCT_FOR_ADD,
  getState({ from: (state) => state.dropshipProducts.products, match: ['product', 'id'] }),
  (state, api) => { api.data.product.commission = state.product.commission; return api })
export const getDropshipProductForManage = buildSaga(null, actions.GET_DROPSHIP_PRODUCT_FOR_MANAGE,
  (params) => (state) => {
    const data = state.storeProducts.storeProducts.reduce((data, store) => {
      const product = store.products.reduce((res, prod) => {
        if (prod.id === params.id && prod.dropship_origin) {
          const catId = store.catalog.id || null
          const { id, name, price, image, dropship_origin: dropship } = prod
          res = { id, name, price, image, catalog_id: catId, commission: dropship.commission }
        }
        return res
      }, false)
      if (product) data.product = product
      const { id, name } = store.catalog
      if (id) data.catalogs.push({ id, name })
      return data
    }, { product: false, catalogs: [] })
    if (data.product === false) throw new Error('Get barang gagal')
    return data
  })

import * as actions from '../actions/stores'
import { buildInitState, createReducer } from '../config'

const initTempCreateStore = {
  store: {
    name: '',
    slogan: '',
    description: '',
    logo: '',
    path: ''
  },
  expedition_services: {
    selectedExpeditions: [],
    selectedServices: []
  },
  user: {
    id_number: '',
    mother_name: ''
  },
  address: {
    province_id: 0,
    district_id: 0,
    sub_district_id: 0,
    village_id: 0,
    name: '',
    email: '',
    phone_number: '',
    postal_code: '',
    address: ''
  }
}

export const stores = createReducer(buildInitState({ store: {} }))
  .addReducer({
    type: actions.GET_STORE,
    resultName: 'store'
  }).run()

export const createStore = createReducer(buildInitState({ store: {} }))
  .addReducer({
    type: actions.CREATE_STORE,
    resultName: 'store'
  }).run()

export const expeditionListStore = createReducer(buildInitState({ expeditions: [] }))
  .addReducer({
    type: actions.STORE_EXPEDITION_LIST,
    resultName: 'expeditions'
  }).run()

export const expeditionStore = createReducer(buildInitState({ expeditions: [] }))
  .addReducer({
    type: actions.STORE_EXPEDITION_MANAGE,
    resultName: 'expeditions'
  }).run()

export const photoUpload = createReducer(buildInitState({ payload: {} }))
  .addReducer({
    type: actions.PHOTO_UPLOAD,
    resultName: 'payload'
  }).run()

export const verifyStore = createReducer(buildInitState())
  .addReducer({
    type: actions.VERIFY_STORE
  }).run()

export const sendMessageStore = createReducer(buildInitState({ store: {} }))
  .addReducer({
    type: actions.MESSAGE_STORE,
    resultName: 'store',
    includeNonSaga: true
  }).run()

export const getOwnStore = createReducer(buildInitState({ ownStore: {} }))
  .addReducer({
    type: actions.GET_OWN_STORE,
    resultName: 'ownStore'
  }).run()

export const getStoreProducts = createReducer(buildInitState({ storeProducts: {} }))
  .addReducer({
    type: actions.GET_STORE_PRODUCTS,
    resultName: 'storeProducts'
  }).run()

export const getStoreCatalogProducts = createReducer(buildInitState({ storeCatalogProducts: {} }, true))
  .addReducer({
    type: actions.GET_STORE_CATALOG_PRODUCTS,
    resultName: 'storeCatalogProducts'
  }).run()

export const updateStore = createReducer(buildInitState({ updateStore: {} }))
  .addReducer({
    type: actions.UPDATE_INFORMATION,
    resultName: 'updateStore',
    add: { type: 'information' }
  })
  .addReducer({
    type: actions.UPDATE_TERM,
    resultName: 'updateStore',
    add: { type: 'term' }
  }).run()

export const getStoreAddress = createReducer(buildInitState({ storeAddress: {} }))
  .addReducer({
    type: actions.GET_ADDRESS,
    resultName: 'storeAddress'
  }).run()

export const updateStoreAddress = createReducer(buildInitState({ updateStoreAddress: {} }))
  .addReducer({
    type: actions.UPDATE_STORE_ADDRESS,
    resultName: 'updateStoreAddress'
  }).run()

export const getHiddenStoreProducts = createReducer(buildInitState({ products: [] }))
  .addReducer({
    type: actions.GET_HIDDEN_STORE_PRODUCTS,
    resultName: 'products'
  }).run()

export const tempCreateStore = createReducer(initTempCreateStore)
  .addReducer({
    type: actions.CREATE_STORE,
    includeNonSaga: true
  }).run()

export const getStoreDiscussions = createReducer(buildInitState({ storeDiscussions: [] }, true))
  .addReducer({
    type: actions.GET_STORE_DISCUSSIONS,
    resultName: 'storeDiscussions'
  }).run()

export const getStoreProductDetail = createReducer(buildInitState({ storeProductDetail: {} }))
  .addReducer({
    type: actions.GET_STORE_PRODUCT_DETAIL,
    resultName: 'storeProductDetail'
  }).run()

export const getStoreProductsByCatalog = createReducer(buildInitState({ products: [] }, true))
  .addReducer({
    type: actions.GET_STORE_PRODUCTS_BY_CATALOG,
    resultName: 'products'
  }).run()

export const unreadDisputesStore = createReducer(buildInitState({ unreaddisputes: '' }))
.addReducer({
  type: actions.UNREAD_DISPUTES_STORE,
  resultName: 'disputes'
}).run()

import * as actions from '../actions/stores'
import * as apis from '../api/stores'
import { buildSaga } from '../config'

export const getStores = buildSaga(['id'], apis.getStores, actions.GET_STORE)
export const createStore = buildSaga([], apis.createStore, actions.CREATE_STORE)
export const storeExpeditionList = buildSaga([], apis.storeExpeditionList, actions.STORE_EXPEDITION_LIST)
export const storeExpeditionManage = buildSaga([], apis.storeExpeditionManage, actions.STORE_EXPEDITION_MANAGE)
export const photoUpload = buildSaga([], apis.photoUpload, actions.PHOTO_UPLOAD)
export const verifyStore = buildSaga(['code'], apis.verifyStore, actions.VERIFY_STORE)
export const sendMessageStore = buildSaga([], apis.sendMessageStore, actions.MESSAGE_STORE)
export const getOwnStore = buildSaga([], apis.getOwnStore, actions.GET_OWN_STORE)
export const getStoreProducts = buildSaga(['hidden'], apis.getStoreProducts, actions.GET_STORE_PRODUCTS)
export const getStoreCatalogProducts = buildSaga(['id', 'hidden'], apis.getStoreCatalogProducts, actions.GET_STORE_CATALOG_PRODUCTS)
export const updateInformation = buildSaga([], apis.updateInformation, actions.UPDATE_INFORMATION)
export const updateTerm = buildSaga([], apis.updateTerm, actions.UPDATE_TERM)
export const getStoreAddress = buildSaga([], apis.getStoreAddress, actions.GET_ADDRESS)
export const updateStoreAddress = buildSaga([], apis.updateStoreAddress, actions.UPDATE_STORE_ADDRESS)

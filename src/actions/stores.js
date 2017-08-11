import { buildAction, typeReq } from '../config'

export const GET_STORE = 'GET_STORE'
export const CREATE_STORE = 'CREATE_STORE'
export const STORE_EXPEDITION_LIST = 'STORE_EXPEDITION_LIST'
export const STORE_EXPEDITION_MANAGE = 'STORE_EXPEDITION_MANAGE'
export const STORE_EXPEDITION_UPDATE = 'STORE_EXPEDITION_UPDATE'
export const PHOTO_UPLOAD = 'PHOTO_UPLOAD'
export const VERIFY_STORE = 'VERIFY_STORE'
export const MESSAGE_STORE = 'MESSAGE_STORE'
export const MESSAGE_STORE_RESET = 'MESSAGE_STORE_RESET'
export const GET_OWN_STORE = 'GET_OWN_STORE'
export const GET_STORE_PRODUCTS = 'GET_STORE_PRODUCTS'
export const GET_STORE_CATALOG_PRODUCTS = 'GET_STORE_CATALOG_PRODUCTS'
// create store
export const INFO_STORE = 'INFO_STORE'
export const SHIPPING_EXPEDITION = 'SHIPPING_EXPEDITION'
export const OWNER_INFO = 'OWNER_INFO'
export const ADDRESS_INFO = 'ADDRESS_INFO'

export const getStores = params => buildAction(typeReq(GET_STORE), params)
export const photoUpload = params => buildAction(typeReq(PHOTO_UPLOAD), params)
export const createStore = params => buildAction(typeReq(CREATE_STORE), params)
export const storeExpeditionList = () => buildAction(typeReq(STORE_EXPEDITION_LIST))
export const storeExpeditionManage = () => buildAction(typeReq(STORE_EXPEDITION_MANAGE))
export const storeUpdateExpedition = params => buildAction(typeReq(STORE_EXPEDITION_UPDATE), params)
export const verifyStore = params => buildAction(typeReq(VERIFY_STORE), params)
export const sendMessageStore = params => buildAction(typeReq(MESSAGE_STORE), params)
export const sendMessageStoreReset = () => buildAction(MESSAGE_STORE_RESET)
export const getOwnStore = () => buildAction(typeReq(GET_OWN_STORE))
export const getStoreProducts = params => buildAction(typeReq(GET_STORE_PRODUCTS), params)
export const getStoreCatalogProducts = params => buildAction(typeReq(GET_STORE_CATALOG_PRODUCTS), params)
// create store
export const infoStore = params => ({ type: INFO_STORE, params })
export const shippingExpedition = params => ({ type: SHIPPING_EXPEDITION, params })
export const OwnerInfo = params => ({ type: OWNER_INFO, params })
export const AddressInfo = params => ({ type: ADDRESS_INFO, params })

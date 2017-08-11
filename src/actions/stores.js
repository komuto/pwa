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
export const UPDATE_INFORMATION = 'UPDATE_INFORMATION'
export const UPDATE_TERM = 'UPDATE_TERM'
export const GET_ADDRESS = 'GET_ADDRESS'
export const UPDATE_STORE_ADDRESS = 'UPDATE_STORE_ADDRESS'

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
export const updateInformation = params => buildAction(typeReq(UPDATE_INFORMATION), params)
export const updateTerm = params => buildAction(typeReq(UPDATE_TERM), params)
export const getStoreAddress = () => buildAction(typeReq(GET_ADDRESS))
export const updateStoreAddress = params => buildAction(typeReq(UPDATE_STORE_ADDRESS), params)

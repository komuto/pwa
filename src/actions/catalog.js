import { buildAction, typeReq } from '../config'

export const CREATE_CATALOG = 'CREATE_CATALOG'
export const CREATE_CATALOG_RESET = 'CREATE_CATALOG_RESET'
export const UPDATE_CATALOG = 'UPDATE_CATALOG'
export const GET_CATALOG = 'GET_CATALOG'
export const GET_LIST_CATALOG = 'GET_LIST_CATALOG'
export const DELETE_CATALOG = 'DELETE_CATALOG'

export const createCatalog = params => buildAction(typeReq(CREATE_CATALOG), params)
export const resetCreateCatalog = () => buildAction(CREATE_CATALOG_RESET)
export const updateCatalog = params => buildAction(typeReq(UPDATE_CATALOG), params)
export const getCatalog = params => buildAction(typeReq(GET_CATALOG), params)
export const getListCatalog = () => buildAction(typeReq(GET_LIST_CATALOG))
export const deleteCatalog = params => buildAction(typeReq(DELETE_CATALOG), params)

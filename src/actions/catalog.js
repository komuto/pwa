import { buildAction, typeReq, typeReset } from '../config'

export const CREATE_CATALOG = 'CREATE_CATALOG'
export const UPDATE_CATALOG = 'UPDATE_CATALOG'
export const GET_CATALOG = 'GET_CATALOG'
export const GET_LIST_CATALOG = 'GET_LIST_CATALOG'
export const DELETE_CATALOG = 'DELETE_CATALOG'

/**
 * @param params are the same as the api
 * @state createCatalog
 */
export const createCatalog = params => buildAction(typeReq(CREATE_CATALOG), params)
export const resetCreateCatalog = () => buildAction(typeReset(CREATE_CATALOG))

/**
 * @param id {int} catalog id
 * @param params are the same as the api
 * @state updateCatalog
 */
export const updateCatalog = params => buildAction(typeReq(UPDATE_CATALOG), params)

/**
 * @params id {int} catalog id
 * @state getCatalog
 */
export const getCatalog = params => buildAction(typeReq(GET_CATALOG), params)

/**
 * @state getListCatalog
 */
export const getListCatalog = () => buildAction(typeReq(GET_LIST_CATALOG))

/**
 * @params id {int} catalog id
 * @state deleteCatalog
 */
export const deleteCatalog = params => buildAction(typeReq(DELETE_CATALOG), params)

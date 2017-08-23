import * as actions from '../actions/catalog'
import * as apis from '../api/catalog'
import { buildSaga } from '../config'

export const createCatalog = buildSaga(apis.createCatalog, actions.CREATE_CATALOG)
export const getCatalog = buildSaga(apis.getCatalog, actions.GET_CATALOG)
export const getListCatalog = buildSaga(apis.getListCatalog, actions.GET_LIST_CATALOG)
export const updateCatalog = buildSaga(apis.updateCatalog, actions.UPDATE_CATALOG)
export const deleteCatalog = buildSaga(apis.deleteCatalog, actions.DELETE_CATALOG)

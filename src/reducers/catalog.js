import * as actions from '../actions/catalog'
import { buildInitState, createReducer } from '../config'

export const createCatalog = createReducer(buildInitState({ catalog: {} }))
  .addReducer({
    type: actions.CREATE_CATALOG,
    resultName: 'catalog',
    includeNonSaga: true
  }).run()

export const updateCatalog = createReducer(buildInitState({ catalog: {} }))
  .addReducer({
    type: actions.UPDATE_CATALOG,
    resultName: 'catalog'
  }).run()

export const getDetailCatalog = createReducer(buildInitState({ catalog: {} }))
  .addReducer({
    type: actions.GET_CATALOG,
    resultName: 'catalog'
  }).run()

export const getListCatalog = createReducer(buildInitState({ catalogs: [] }))
  .addReducer({
    type: actions.GET_LIST_CATALOG,
    resultName: 'catalogs'
  }).run()

export const deleteCatalog = createReducer(buildInitState({ catalog: {} }))
  .addReducer({
    type: actions.DELETE_CATALOG,
    resultName: 'catalog'
  }).run()

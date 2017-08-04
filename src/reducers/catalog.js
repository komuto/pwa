import * as actions from '../actions/catalog'
import { buildReducer, buildType, initState } from '../config'

const initCatalog = {
  catalog: {},
  ...initState()
}

const initListCatalog = {
  catalogs: [],
  ...initState()
}

function createCatalog (state = initCatalog, action) {
  const type = buildType(action.type)
  switch (type) {
    case actions.CREATE_CATALOG:
      return buildReducer(state, action, type, 'catalog')
    case actions.CREATE_CATALOG_RESET:
      return initCatalog
    default:
      return state
  }
}

function updateCatalog (state = initCatalog, action) {
  const type = buildType(action.type)
  switch (type) {
    case actions.UPDATE_CATALOG:
      return buildReducer(state, action, type, 'catalog')
    default:
      return state
  }
}

function getDetailCatalog (state = initCatalog, action) {
  const type = buildType(action.type)
  switch (type) {
    case actions.GET_CATALOG:
      return buildReducer(state, action, type, 'catalog')
    default:
      return state
  }
}

function getListCatalog (state = initListCatalog, action) {
  const type = buildType(action.type)
  switch (type) {
    case actions.GET_LIST_CATALOG:
      return buildReducer(state, action, type, 'catalogs')
    default:
      return state
  }
}

function deleteCatalog (state = initCatalog, action) {
  const type = buildType(action.type)
  switch (type) {
    case actions.DELETE_CATALOG:
      return buildReducer(state, action, type, 'catalog')
    default:
      return state
  }
}

export {
  createCatalog,
  updateCatalog,
  getDetailCatalog,
  getListCatalog,
  deleteCatalog
}

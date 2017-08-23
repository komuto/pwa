import * as actions from '../actions/catalog'
import { buildReducer, buildType, initState } from '../config'

export const createCatalog = (state = initState({ catalog: {} }), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.CREATE_CATALOG:
      return buildReducer(state, action, type, 'catalog')
    case actions.CREATE_CATALOG_RESET:
      return initState({ catalog: {} })
    default:
      return state
  }
}

export const updateCatalog = (state = initState({ catalog: {} }), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.UPDATE_CATALOG:
      return buildReducer(state, action, type, 'catalog')
    default:
      return state
  }
}

export const getDetailCatalog = (state = initState({ catalog: {} }), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.GET_CATALOG:
      return buildReducer(state, action, type, 'catalog')
    default:
      return state
  }
}

export const getListCatalog = (state = initState({ catalogs: [] }), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.GET_LIST_CATALOG:
      return buildReducer(state, action, type, 'catalogs')
    default:
      return state
  }
}

export const deleteCatalog = (state = initState({ catalog: {} }), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.DELETE_CATALOG:
      return buildReducer(state, action, type, 'catalog')
    default:
      return state
  }
}

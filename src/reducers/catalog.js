import * as actions from '../actions/catalog'

const initCatalog = {
  catalog: {},
  message: '',
  status: 0,
  isLoading: false,
  isOnline: true,
  isFound: false
}

const initListCatalog = {
  catalogs: [],
  message: '',
  status: 0,
  isLoading: false,
  isOnline: true,
  isFound: false
}

function createCatalog (state = initCatalog, action) {
  switch (action.type) {
    case actions.CREATE_CATALOG_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case actions.CREATE_CATALOG_SUCCESS:
      return {
        ...state,
        catalog: action.data,
        message: action.message,
        status: action.code,
        isLoading: false,
        isFound: true,
        isOnline: true
      }
    case actions.CREATE_CATALOG_FAILURE:
      return {
        ...state,
        message: action.message,
        status: action.code,
        isLoading: false,
        isFound: false,
        isOnline: action.isOnline
      }
    case actions.CREATE_CATALOG_RESET:
      return {
        ...state,
        status: 0
      }
    default:
      return state
  }
}

function updateCatalog (state = initCatalog, action) {
  switch (action.type) {
    case actions.UPDATE_CATALOG_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case actions.UPDATE_CATALOG_SUCCESS:
      return {
        ...state,
        catalog: action.data,
        message: action.message,
        status: action.code,
        isLoading: false,
        isFound: true,
        isOnline: true
      }
    case actions.UPDATE_CATALOG_FAILURE:
      return {
        ...state,
        message: action.message,
        status: action.code,
        isLoading: false,
        isFound: false,
        isOnline: action.isOnline
      }
    default:
      return state
  }
}

function getDetailCatalog (state = initCatalog, action) {
  switch (action.type) {
    case actions.GET_CATALOG_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case actions.GET_CATALOG_SUCCESS:
      return {
        ...state,
        catalog: action.data,
        message: action.message,
        status: action.code,
        isLoading: false,
        isFound: true,
        isOnline: true
      }
    case actions.GET_CATALOG_FAILURE:
      return {
        ...state,
        message: action.message,
        status: action.code,
        isLoading: false,
        isFound: false,
        isOnline: action.isOnline
      }
    default:
      return state
  }
}

function getListCatalog (state = initListCatalog, action) {
  switch (action.type) {
    case actions.GET_LISTCATALOG_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case actions.GET_LISTCATALOG_SUCCESS:
      return {
        ...state,
        catalogs: action.data,
        message: action.message,
        status: action.code,
        isLoading: false,
        isFound: true,
        isOnline: true
      }
    case actions.GET_LISTCATALOG_FAILURE:
      return {
        ...state,
        message: action.message,
        status: action.code,
        isLoading: false,
        isFound: false,
        isOnline: action.isOnline
      }
    default:
      return state
  }
}

function deleteCatalog (state = initCatalog, action) {
  switch (action.type) {
    case actions.DELETE_CATALOG_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case actions.DELETE_CATALOG_SUCCESS:
      return {
        ...state,
        message: action.message,
        status: action.code,
        isLoading: false,
        isFound: true,
        isOnline: true
      }
    case actions.DELETE_CATALOG_FAILURE:
      return {
        ...state,
        message: action.message,
        status: action.code,
        isLoading: false,
        isFound: false,
        isOnline: action.isOnline
      }
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

export const CREATE_CATALOG_REQUEST = 'CREATE_CATALOG_REQUEST'
export const CREATE_CATALOG_SUCCESS = 'CREATE_CATALOG_SUCCESS'
export const CREATE_CATALOG_FAILURE = 'CREATE_CATALOG_FAILURE'
export const CREATE_CATALOG_RESET = 'CREATE_CATALOG_RESET'

export const UPDATE_CATALOG_REQUEST = 'UPDATE_CATALOG_REQUEST'
export const UPDATE_CATALOG_SUCCESS = 'UPDATE_CATALOG_SUCCESS'
export const UPDATE_CATALOG_FAILURE = 'UPDATE_CATALOG_FAILURE'

export const GET_CATALOG_REQUEST = 'GET_CATALOG_REQUEST'
export const GET_CATALOG_SUCCESS = 'GET_CATALOG_SUCCESS'
export const GET_CATALOG_FAILURE = 'GET_CATALOG_FAILURE'

export const GET_LISTCATALOG_REQUEST = 'GET_LISTCATALOG_REQUEST'
export const GET_LISTCATALOG_SUCCESS = 'GET_LISTCATALOG_SUCCESS'
export const GET_LISTCATALOG_FAILURE = 'GET_LISTCATALOG_FAILURE'

export const DELETE_CATALOG_REQUEST = 'DELETE_CATALOG_REQUEST'
export const DELETE_CATALOG_SUCCESS = 'DELETE_CATALOG_SUCCESS'
export const DELETE_CATALOG_FAILURE = 'DELETE_CATALOG_FAILURE'

function createCatalog (params) {
  return {
    type: CREATE_CATALOG_REQUEST,
    ...params
  }
}

function resetCreateCatalog () {
  return {
    type: CREATE_CATALOG_RESET
  }
}

function updateCatalog (params) {
  return {
    type: UPDATE_CATALOG_REQUEST,
    ...params
  }
}

function getCatalog () {
  return {
    type: GET_CATALOG_REQUEST
  }
}

function getListCatalog () {
  return {
    type: GET_LISTCATALOG_REQUEST
  }
}

function deleteCatalog (params) {
  return {
    type: DELETE_CATALOG_REQUEST,
    ...params
  }
}

export {
  createCatalog,
  resetCreateCatalog,
  updateCatalog,
  getCatalog,
  getListCatalog,
  deleteCatalog
}

export const ADD_ADDRESS_REQUEST = 'ADD_ADDRESS_REQUEST'
export const ADD_ADDRESS_SUCCESS = 'ADD_ADDRESS_SUCCESS'
export const ADD_ADDRESS_FAILURE = 'ADD_ADDRESS_FAILURE'

export const UPDATE_ADDRESS_REQUEST = 'UPDATE_ADDRESS_REQUEST'
export const UPDATE_ADDRESS_SUCCESS = 'UPDATE_ADDRESS_SUCCESS'
export const UPDATE_ADDRESS_FAILURE = 'UPDATE_ADDRESS_FAILURE'

export const DELETE_ADDRESS_REQUEST = 'DELETE_ADDRESS_REQUEST'
export const DELETE_ADDRESS_SUCCESS = 'DELETE_ADDRESS_SUCCESS'
export const DELETE_ADDRESS_FAILURE = 'DELETE_ADDRESS_FAILURE'

export const GET_ADDRESSDETAIL_REQUEST = 'GET_ADDRESSDETAIL_REQUEST'
export const GET_ADDRESSDETAIL_SUCCESS = 'GET_ADDRESSDETAIL_SUCCESS'
export const GET_ADDRESSDETAIL_FAILURE = 'GET_ADDRESSDETAIL_FAILURE'

export const GET_LISTADDRESS_REQUEST = 'GET_LISTADDRESS_REQUEST'
export const GET_LISTADDRESS_SUCCESS = 'GET_LISTADDRESS_SUCCESS'
export const GET_LISTADDRESS_FAILURE = 'GET_LISTADDRESS_FAILURE'

export const RESET_STATUS_ADDRESS = 'RESET_STATUS_ADDRESS'

function addAddress (params) {
  return {
    type: ADD_ADDRESS_REQUEST,
    ...params
  }
}

function updateAddress (params) {
  return {
    type: UPDATE_ADDRESS_REQUEST,
    ...params
  }
}

function deleteAddress (params) {
  return {
    type: DELETE_ADDRESS_REQUEST,
    ...params
  }
}

function getAddressDetail (params) {
  return {
    type: GET_ADDRESSDETAIL_REQUEST,
    ...params
  }
}

function getListAddress () {
  return {
    type: GET_LISTADDRESS_REQUEST
  }
}

function resetStatusAddress () {
  return {
    type: RESET_STATUS_ADDRESS
  }
}

export {
  addAddress,
  updateAddress,
  deleteAddress,
  getAddressDetail,
  getListAddress,
  resetStatusAddress
}

export const GET_STORE_REQUEST = 'GET_STORE_REQUEST'
export const GET_STORE_SUCCESS = 'GET_STORE_SUCCESS'
export const GET_STORE_FAILURE = 'GET_STORE_FAILURE'

function getStores (params) {
  return {
    type: GET_STORE_REQUEST,
    ...params
  }
}

export {
  getStores
}

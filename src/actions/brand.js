export const GET_BRAND_REQUEST = 'GET_BRAND_REQUEST'
export const GET_BRAND_SUCCESS = 'GET_BRAND_SUCCESS'
export const GET_BRAND_FAILURE = 'GET_BRAND_FAILURE'

function getBrand () {
  return {
    type: GET_BRAND_REQUEST
  }
}

export {
  getBrand
}

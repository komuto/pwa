export const GET_BRAND_REQUEST = 'GET_BRAND_REQUEST'
export const GET_BRAND_SUCCESS = 'GET_BRAND_SUCCESS'
export const GET_BRAND_FAILURE = 'GET_BRAND_FAILURE'

export const BRAND_BYCATEGORY_REQUEST = 'BRAND_BYCATEGORY_REQUEST'
export const BRAND_BYCATEGORY_SUCCESS = 'BRAND_BYCATEGORY_SUCCESS'
export const BRAND_BYCATEGORY_FAILURE = 'BRAND_BYCATEGORY_FAILURE'

function getBrand () {
  return {
    type: GET_BRAND_REQUEST
  }
}

function getBrandByCategory (params) {
  return {
    type: BRAND_BYCATEGORY_REQUEST,
    ...params
  }
}

export {
  getBrand,
  getBrandByCategory
}

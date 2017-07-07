export const GET_PRODUCT_REQUEST = 'GET_PRODUCT_REQUEST'
export const GET_PRODUCT_SUCCESS = 'GET_PRODUCT_SUCCESS'
export const GET_PRODUCT_FAILURE = 'GET_PRODUCT_FAILURE'

export const LIST_PRODUCTBYCATEGORY_REQUEST = 'LIST_PRODUCTBYCATEGORY_REQUEST'
export const LIST_PRODUCTBYCATEGORY_SUCCESS = 'LIST_PRODUCTBYCATEGORY_SUCCESS'
export const LIST_PRODUCTBYCATEGORY_FAILURE = 'LIST_PRODUCTBYCATEGORY_FAILURE'

export const LIST_PRODUCTBYSEARCH_REQUEST = 'LIST_PRODUCTBYSEARCH_REQUEST'
export const LIST_PRODUCTBYSEARCH_SUCCESS = 'LIST_PRODUCTBYSEARCH_SUCCESS'
export const LIST_PRODUCTBYSEARCH_FAILURE = 'LIST_PRODUCTBYSEARCH_FAILURE'

function getProduct (params) {
  return {
    type: GET_PRODUCT_REQUEST,
    ...params
  }
}

function listProductByCategory (params) {
  return {
    type: LIST_PRODUCTBYCATEGORY_REQUEST,
    ...params
  }
}

function listProductBySearch (params) {
  return {
    type: LIST_PRODUCTBYSEARCH_REQUEST,
    ...params
  }
}

export {
    getProduct,
    listProductByCategory,
    listProductBySearch
}

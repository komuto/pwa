export const GET_WISHLIST_REQUEST = 'GET_WISHLIST_REQUEST'
export const GET_WISHLIST_SUCCESS = 'GET_WISHLIST_SUCCESS'
export const GET_WISHLIST_FAILURE = 'GET_WISHLIST_FAILURE'

function wishlist () {
  return {
    type: GET_WISHLIST_REQUEST
  }
}

export {
    wishlist
}

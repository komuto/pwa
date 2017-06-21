export const GET_EXPEDITION_REQUEST = 'GET_EXPEDITION_REQUEST'
export const GET_EXPEDITION_SUCCESS = 'GET_EXPEDITION_SUCCESS'
export const GET_EXPEDITION_FAILURE = 'GET_EXPEDITION_FAILURE'

function getExpedition () {
  return {
    type: GET_EXPEDITION_REQUEST
  }
}

export {
  getExpedition
}

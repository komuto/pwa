export const LIST_BANK_REQUEST = 'LIST_BANK_REQUEST'
export const LIST_BANK_SUCCESS = 'LIST_BANK_SUCCESS'
export const LIST_BANK_FAILURE = 'LIST_BANK_FAILURE'

export const CREATE_BANK_REQUEST = 'CREATE_BANK_REQUEST'
export const CREATE_BANK_SUCCESS = 'CREATE_BANK_SUCCESS'
export const CREATE_BANK_FAILURE = 'CREATE_BANK_FAILURE'

export const GET_BANK_REQUEST = 'GET_BANK_REQUEST'
export const GET_BANK_SUCCESS = 'GET_BANK_SUCCESS'
export const GET_BANK_FAILURE = 'GET_BANK_FAILURE'

function listBank () {
  return {
    type: LIST_BANK_REQUEST
  }
}

// function newBank ()

function getBank (params) {
  return {
    type: GET_BANK_REQUEST,
    ...params
  }
}

export {
  listBank,
  getBank
}

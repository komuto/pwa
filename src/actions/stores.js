export const GET_STORE_REQUEST = 'GET_STORE_REQUEST'
export const GET_STORE_SUCCESS = 'GET_STORE_SUCCESS'
export const GET_STORE_FAILURE = 'GET_STORE_FAILURE'

export const CREATE_STORE_REQUEST = 'CREATE_STORE_REQUEST'
export const CREATE_STORE_SUCCESS = 'CREATE_STORE_SUCCESS'
export const CREATE_STORE_FAILURE = 'CREATE_STORE_FAILURE'

export const STORE_EXPEDITIONLIST_REQUEST = 'STORE_EXPEDITIONLIST_REQUEST'
export const STORE_EXPEDITIONLIST_SUCCESS = 'STORE_EXPEDITIONLIST_SUCCESS'
export const STORE_EXPEDITIONLIST_FAILURE = 'STORE_EXPEDITIONLIST_FAILURE'

export const STORE_EXPEDITIONMANAGE_REQUEST = 'STORE_EXPEDITIONMANAGE_REQUEST'
export const STORE_EXPEDITIONMANAGE_SUCCESS = 'STORE_EXPEDITIONMANAGE_SUCCESS'
export const STORE_EXPEDITIONMANAGE_FAILURE = 'STORE_EXPEDITIONMANAGE_FAILURE'

export const STOREEXPEDITION_UPDATE_REQUEST = 'STOREEXPEDITION_UPDATE_REQUEST'
export const STOREEXPEDITION_UPDATE_SUCCESS = 'STOREEXPEDITION_UPDATE_SUCCESS'
export const STOREEXPEDITION_UPDATE_FAILURE = 'STOREEXPEDITION_UPDATE_FAILURE'

export const PHOTO_UPLOAD_REQUEST = 'PHOTO_UPLOAD_REQUEST'
export const PHOTO_UPLOAD_SUCCESS = 'PHOTO_UPLOAD_SUCCESS'
export const PHOTO_UPLOAD_FAILURE = 'PHOTO_UPLOAD_FAILURE'

export const VERIFY_STORE_REQUEST = 'VERIFY_STORE_REQUEST'
export const VERIFY_STORE_SUCCESS = 'VERIFY_STORE_SUCCESS'
export const VERIFY_STORE_FAILURE = 'VERIFY_STORE_FAILURE'

export const MESSAGE_STORE_REQUEST = 'MESSAGE_STORE_REQUEST'
export const MESSAGE_STORE_SUCCESS = 'MESSAGE_STORE_SUCCESS'
export const MESSAGE_STORE_FAILURE = 'MESSAGE_STORE_FAILURE'
export const MESSAGE_STORE_RESET = 'MESSAGE_STORE_RESET'

function getStores (params) {
  return {
    type: GET_STORE_REQUEST,
    ...params
  }
}

function photoUpload (params) {
  return {
    type: PHOTO_UPLOAD_REQUEST,
    ...params
  }
}

function createStore (params) {
  return {
    type: CREATE_STORE_REQUEST,
    ...params
  }
}

function storeExpeditionList () {
  return {
    type: STORE_EXPEDITIONLIST_REQUEST
  }
}

function storeExpeditionManage () {
  return {
    type: STORE_EXPEDITIONMANAGE_REQUEST
  }
}

function storeUpdateExpedition (params) {
  return {
    type: STOREEXPEDITION_UPDATE_REQUEST,
    ...params
  }
}

function verifyStore (params) {
  return {
    type: VERIFY_STORE_REQUEST,
    ...params
  }
}

function sendMessageStore (params) {
  return {
    type: MESSAGE_STORE_REQUEST,
    ...params
  }
}

function sendMessageStoreReset () {
  return {
    type: MESSAGE_STORE_RESET
  }
}

export {
  getStores,
  createStore,
  photoUpload,
  storeExpeditionList,
  storeExpeditionManage,
  storeUpdateExpedition,
  verifyStore,
  sendMessageStore,
  sendMessageStoreReset

}

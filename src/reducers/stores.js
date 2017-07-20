import * as storeActions from '../actions/stores'

const initStore = {
  store: {},
  message: '',
  status: 0,
  isLoading: false,
  isFound: false,
  isOnline: true
}

const initExpedition = {
  expeditions: [],
  message: '',
  status: 0,
  isLoading: false,
  isFound: false,
  isOnline: true
}

const initUpload = {
  payload: [],
  message: '',
  status: 0,
  isLoading: false,
  isFound: false,
  isOnline: true
}

function stores (state = initStore, action) {
  switch (action.type) {
    case storeActions.GET_STORE_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case storeActions.GET_STORE_SUCCESS:
      return {
        ...state,
        store: action.data,
        message: action.message,
        status: action.code,
        isLoading: false,
        isFound: true,
        isOnline: true
      }
    case storeActions.GET_STORE_FAILURE:
      return {
        ...state,
        message: action.message,
        status: action.code,
        isLoading: false,
        isFound: false,
        isOnline: action.isOnline
      }
    default:
      return state
  }
}

function createStore (state = initStore, action) {
  switch (action.type) {
    case storeActions.CREATE_STORE_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case storeActions.CREATE_STORE_SUCCESS:
      return {
        ...state,
        store: action.data,
        message: action.message,
        status: action.code,
        isLoading: false,
        isFound: true,
        isOnline: true
      }
    case storeActions.CREATE_STORE_FAILURE:
      return {
        ...state,
        message: action.message,
        status: action.code,
        isLoading: false,
        isFound: false,
        isOnline: action.isOnline
      }
    default:
      return state
  }
}

function expeditionListStore (state = initExpedition, action) {
  switch (action.type) {
    case storeActions.STORE_EXPEDITIONLIST_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case storeActions.STORE_EXPEDITIONLIST_SUCCESS:
      return {
        ...state,
        expeditions: action.data,
        message: action.message,
        status: action.code,
        isLoading: false,
        isFound: true,
        isOnline: true
      }
    case storeActions.STORE_EXPEDITIONLIST_FAILURE:
      return {
        ...state,
        message: action.message,
        status: action.code,
        isLoading: false,
        isFound: false,
        isOnline: action.isOnline
      }
    default:
      return state
  }
}

function expeditionStore (state = initExpedition, action) {
  switch (action.type) {
    case storeActions.STORE_EXPEDITIONMANAGE_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case storeActions.STORE_EXPEDITIONMANAGE_SUCCESS:
      return {
        ...state,
        expeditions: action.data,
        message: action.message,
        status: action.code,
        isLoading: false,
        isFound: true,
        isOnline: true
      }
    case storeActions.STORE_EXPEDITIONMANAGE_FAILURE:
      return {
        ...state,
        message: action.message,
        status: action.code,
        isLoading: false,
        isFound: false,
        isOnline: action.isOnline
      }
    default:
      return state
  }
}

function photoUpload (state = initUpload, action) {
  switch (action.type) {
    case storeActions.PHOTO_UPLOAD_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case storeActions.PHOTO_UPLOAD_SUCCESS:
      return {
        ...state,
        payload: action.data,
        message: action.message,
        status: action.code,
        isLoading: false,
        isFound: true,
        isOnline: true
      }
    case storeActions.PHOTO_UPLOAD_FAILURE:
      return {
        ...state,
        message: action.message,
        status: action.code,
        isLoading: false,
        isFound: false,
        isOnline: action.isOnline
      }
    default:
      return state
  }
}

export {
    stores,
    photoUpload,
    createStore,
    expeditionListStore,
    expeditionStore
}

import * as actions from '../actions/stores'
import { buildReducer, buildType, initState } from '../config'

const initStore = {
  store: {},
  ...initState()
}

const initExpedition = {
  expeditions: [],
  ...initState()
}

const initVerify = {
  ...initState()
}

const initOwnStore = {
  ownStore: {},
  ...initState()
}

const initStoreProducts = {
  storeProducts: {},
  ...initState()
}

const initProcessCreateStore = {
  store: {
    name: '',
    slogan: '',
    description: '',
    logo: '',
    path: ''
  },
  expedition_services: {
    selectedExpeditions: [],
    selectedServices: []
  },
  user: {
    id_number: '',
    mother_name: ''
  },
  address: {
    province_id: null,
    district_id: null,
    sub_district_id: null,
    village_id: null,
    name: '',
    email: '',
    phone_number: '',
    postal_code: '',
    address: ''
  }
}

function stores (state = initStore, action) {
  const type = buildType(action.type)
  switch (type) {
    case actions.GET_STORE:
      return buildReducer(state, action, type, 'store')
    default:
      return state
  }
}

function createStore (state = initStore, action) {
  const type = buildType(action.type)
  switch (type) {
    case actions.CREATE_STORE:
      return buildReducer(state, action, type, 'store')
    default:
      return state
  }
}

function expeditionListStore (state = initExpedition, action) {
  const type = buildType(action.type)
  switch (type) {
    case actions.STORE_EXPEDITION_LIST:
      return buildReducer(state, action, type, 'expeditions')
    default:
      return state
  }
}

function expeditionStore (state = initExpedition, action) {
  const type = buildType(action.type)
  switch (type) {
    case actions.STORE_EXPEDITION_MANAGE:
      return buildReducer(state, action, type, 'expeditions')
    default:
      return state
  }
}

function photoUpload (state = initState({ payload: {} }), action) {
  const type = buildType(action.type)
  switch (type) {
    case actions.PHOTO_UPLOAD:
      return buildReducer(state, action, type, 'payload')
    default:
      return state
  }
}

function verifyStore (state = initVerify, action) {
  const type = buildType(action.type)
  switch (type) {
    case actions.VERIFY_STORE:
      return buildReducer(state, action, type)
    default:
      return state
  }
}

function sendMessageStore (state = initStore, action) {
  const type = buildType(action.type)
  switch (type) {
    case actions.MESSAGE_STORE:
      return buildReducer(state, action, type, 'store')
    case actions.MESSAGE_STORE_RESET:
      return initStore
    default:
      return state
  }
}

export const getOwnStore = (state = initOwnStore, action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.GET_OWN_STORE:
      return buildReducer(state, action, type, 'ownStore')
    default:
      return state
  }
}

export const getStoreProducts = (state = initStoreProducts, action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.GET_STORE_PRODUCTS:
      return buildReducer(state, action, type, 'storeProducts')
    default:
      return state
  }
}

export const getStoreCatalogProducts = (state = initState({ storeCatalogProducts: {} }), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.GET_STORE_CATALOG_PRODUCTS:
      return buildReducer(state, action, type, 'storeCatalogProducts')
    default:
      return state
  }
}

const processCreateStore = (state = initProcessCreateStore, action) => {
  switch (action.type) {
    case actions.INFO_STORE: {
      return {
        ...state,
        store: action.params
      }
    }
    case actions.SHIPPING_EXPEDITION: {
      return {
        ...state,
        expedition_services: action.params
      }
    }
    case actions.OWNER_INFO: {
      return {
        ...state,
        user: action.params
      }
    }
    case actions.ADDRESS_INFO: {
      return {
        ...state,
        address: action.params
      }
    }
    default:
      return state
  }
}

export const updateStore = (state = initState({ updateStore: {} }), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.UPDATE_INFORMATION:
      return { ...buildReducer(state, action, type, 'updateStore'), type: 'information' }
    case actions.UPDATE_TERM:
      return { ...buildReducer(state, action, type, 'updateStore'), type: 'term' }
    default:
      return state
  }
}

export const getStoreAddress = (state = initState({ storeAddress: {} }), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.GET_ADDRESS:
      return buildReducer(state, action, type, 'storeAddress')
    default:
      return state
  }
}

export const updateStoreAddress = (state = initState({ updateStoreAddress: {} }), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.UPDATE_STORE_ADDRESS:
      return buildReducer(state, action, type, 'updateStoreAddress')
    default:
      return state
  }
}

export {
    processCreateStore,
    stores,
    photoUpload,
    createStore,
    expeditionListStore,
    expeditionStore,
    verifyStore,
    sendMessageStore
}

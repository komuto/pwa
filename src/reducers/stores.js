import * as actions from '../actions/stores'
import { buildReducer, buildType, initState } from '../config'

const initTempCreateStore = {
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
    province_id: 0,
    district_id: 0,
    sub_district_id: 0,
    village_id: 0,
    name: '',
    email: '',
    phone_number: '',
    postal_code: '',
    address: ''
  }
}

export const stores = (state = initState({ store: {} }), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.GET_STORE:
      return buildReducer(state, action, type, 'store')
    default:
      return state
  }
}

export const createStore = (state = initState({ store: {} }), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.CREATE_STORE:
      return buildReducer(state, action, type, 'store')
    default:
      return state
  }
}

export const expeditionListStore = (state = initState({ expeditions: [] }), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.STORE_EXPEDITION_LIST:
      return buildReducer(state, action, type, 'expeditions')
    default:
      return state
  }
}

export const expeditionStore = (state = initState({ expeditions: [] }), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.STORE_EXPEDITION_MANAGE:
      return buildReducer(state, action, type, 'expeditions')
    default:
      return state
  }
}

export const photoUpload = (state = initState({ payload: {} }), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.PHOTO_UPLOAD:
      return buildReducer(state, action, type, 'payload')
    default:
      return state
  }
}

export const verifyStore = (state = initState(), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.VERIFY_STORE:
      return buildReducer(state, action, type)
    default:
      return state
  }
}

export const sendMessageStore = (state = initState({ store: {} }), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.MESSAGE_STORE:
      return buildReducer(state, action, type, 'store')
    case actions.MESSAGE_STORE_RESET:
      return initState({ store: {} })
    default:
      return state
  }
}

export const getOwnStore = (state = initState({ ownStore: {} }), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.GET_OWN_STORE:
      return buildReducer(state, action, type, 'ownStore')
    default:
      return state
  }
}

export const getStoreProducts = (state = initState({ storeProducts: {} }), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.GET_STORE_PRODUCTS:
      return buildReducer(state, action, type, 'storeProducts')
    default:
      return state
  }
}

export const getStoreCatalogProducts = (state = initState({ storeCatalogProducts: {} }, true), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.GET_STORE_CATALOG_PRODUCTS:
      return buildReducer(state, action, type, 'storeCatalogProducts', true)
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

export const getHiddenStoreProducts = (state = initState({ hiddenStoreProducts: [] }), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.GET_HIDDEN_STORE_PRODUCTS:
      return buildReducer(state, action, type, 'hiddenStoreProducts')
    default:
      return state
  }
}

export const tempCreateStore = (state = initTempCreateStore, { type, ...temp }) => {
  switch (type) {
    case actions.TEMP_CREATE_STORE:
      return { ...state, ...temp }
    default:
      return state
  }
}

export const getStoreDiscussions = (state = initState({ storeDiscussions: [] }, true), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.GET_STORE_DISCUSSIONS:
      return buildReducer(state, action, type, 'storeDiscussions', true)
    default:
      return state
  }
}

export const getStoreProductDetail = (state = initState({ storeProductDetail: {} }), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.GET_STORE_PRODUCT_DETAIL:
      return buildReducer(state, action, type, 'storeProductDetail')
    default:
      return state
  }
}

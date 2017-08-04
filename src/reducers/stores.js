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

const initUpload = {
  payload: [],
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

function photoUpload (state = initUpload, action) {
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

export {
    stores,
    photoUpload,
    createStore,
    expeditionListStore,
    expeditionStore,
    verifyStore,
    sendMessageStore
}

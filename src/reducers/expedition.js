import * as actions from '../actions/expedition'
import { buildReducer, buildType, initState } from '../config'

const initExpedition = {
  expeditions: [],
  ...initState()
}

const initExpeditionServices = {
  expeditionServices: [],
  ...initState()
}

const initCharge = {
  charges: [],
  ...initState()
}

const initUpdate = {
  ...initState()
}

function expedition (state = initExpedition, action) {
  const type = buildType(action.type)
  switch (type) {
    case actions.GET_EXPEDITION:
      return buildReducer(state, action, type, 'expeditions')
    default:
      return state
  }
}

function expeditionServices (state = initExpeditionServices, action) {
  const type = buildType(action.type)
  switch (type) {
    case actions.GET_EXPEDITION_SERVICES:
      return buildReducer(state, action, type, 'expeditionServices')
    default:
      return state
  }
}

function estimatedShipping (state = initCharge, action) {
  const type = buildType(action.type)
  switch (type) {
    case actions.ESTIMATED_SHIPPING:
      return buildReducer(state, action, type, 'charges')
    default:
      return state
  }
}

function shippingCharge (state = initCharge, action) {
  const type = buildType(action.type)
  switch (type) {
    case actions.GET_SHIPPING_CHARGE:
      return buildReducer(state, action, type, 'charges')
    default:
      return state
  }
}

function updateExpediton (state = initUpdate, action) {
  const type = buildType(action.type)
  switch (type) {
    case actions.UPDATE_EXPEDITION:
      return buildReducer(state, action, type)
    default:
      return state
  }
}

export const getStoreExpeditions = (state = initState({ storeExpeditions: [] }), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.GET_STORE_EXPEDITIONS:
      return buildReducer(state, action, type, 'storeExpeditions')
    default:
      return state
  }
}

export const manageStoreExpeditions = (state = initState({ manageExpeditions: [] }), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.MANAGE_STORE_EXPEDITIONS:
      return buildReducer(state, action, type, 'manageExpeditions')
    default:
      return state
  }
}

export {
  expedition,
  expeditionServices,
  estimatedShipping,
  shippingCharge,
  updateExpediton
}

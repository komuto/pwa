import * as actions from '../actions/expedition'
import { buildReducer, buildType, initState } from '../config'

export const expedition = (state = initState({ expeditions: [] }), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.GET_EXPEDITION:
      return buildReducer(state, action, type, 'expeditions')
    default:
      return state
  }
}

export const expeditionServices = (state = initState({ expeditionServices: [] }), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.GET_EXPEDITION_SERVICES:
      return buildReducer(state, action, type, 'expeditionServices')
    default:
      return state
  }
}

export const estimatedShipping = (state = initState({ charges: [] }), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.ESTIMATED_SHIPPING:
      return buildReducer(state, action, type, 'charges')
    default:
      return state
  }
}

export const shippingCharge = (state = initState({ charges: [] }), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.GET_SHIPPING_CHARGE:
      return buildReducer(state, action, type, 'charges')
    default:
      return state
  }
}

export const updateExpediton = (state = initState(), action) => {
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

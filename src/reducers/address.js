import * as actions from '../actions/address'
import { buildReducer, buildType, initState } from '../config'

export const address = (state = initState({ address: {} }), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.GET_ADDRESS_DETAIL:
      return buildReducer(state, action, type, 'address')
    default:
      return state
  }
}

export const primaryAddress = (state = initState({ address: {} }), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.GET_PRIMARY_ADDRESS:
      return buildReducer(state, action, type, 'address')
    case actions.PRIMARY_ADDRESS_RESET:
      return initState({ address: {} })
    default:
      return state
  }
}

export const addAddress = (state = initState({ address: {} }), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.ADD_ADDRESS:
      return buildReducer(state, action, type, 'address')
    case actions.ADD_ADDRESS_RESET:
      return initState({ address: {} })
    default:
      return state
  }
}

export const updateAddress = (state = initState({ address: {} }), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.UPDATE_ADDRESS:
      return buildReducer(state, action, type, 'address')
    default:
      return state
  }
}

export const deleteAddress = (state = initState({ address: {} }), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.DELETE_ADDRESS:
      return buildReducer(state, action, type, 'address')
    default:
      return state
  }
}

export const listAddress = (state = initState({ address: [] }), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.GET_LIST_ADDRESS:
      return buildReducer(state, action, type, 'address')
    default:
      return state
  }
}

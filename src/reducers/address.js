import * as actions from '../actions/address'
import { buildReducer, buildType, initState } from '../config'

const initAddress = {
  address: {},
  ...initState()
}

const initListAddress = {
  address: [],
  ...initState()
}

export const address = (state = initAddress, action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.GET_ADDRESS_DETAIL:
      return buildReducer(state, action, type, 'address')
    default:
      return state
  }
}

export const primaryAddress = (state = initAddress, action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.GET_PRIMARY_ADDRESS:
      return buildReducer(state, action, type, 'address')
    default:
      return state
  }
}

export const addAddress = (state = initAddress, action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.ADD_ADDRESS:
      return buildReducer(state, action, type, 'address')
    case actions.ADD_ADDRESS_RESET:
      return initAddress
    default:
      return state
  }
}

export const updateAddress = (state = initAddress, action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.UPDATE_ADDRESS:
      return buildReducer(state, action, type, 'address')
    default:
      return state
  }
}

export const deleteAddress = (state = initAddress, action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.DELETE_ADDRESS:
      return buildReducer(state, action, type, 'address')
    default:
      return state
  }
}

export const listAddress = (state = initListAddress, action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.GET_LIST_ADDRESS:
      return buildReducer(state, action, type, 'address')
    default:
      return state
  }
}

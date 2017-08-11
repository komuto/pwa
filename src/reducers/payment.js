import * as actions from '../actions/payment'
import { buildReducer, initState, buildType } from '../config'

export const getPaymentMethods = (state = initState({ paymentMethods: [] }), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.GET_PAYMENT_METHODS:
      return buildReducer(state, action, type, 'paymentMethods')
    default:
      return state
  }
}

export const choosePaymentMethod = (state = initState({ cart: {} }), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.CHOOSE_PAYMENT_METHOD:
      return buildReducer(state, action, type, 'cart')
    default:
      return state
  }
}

export const confirmTransfer = (state = initState({ confirmation: {} }), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.CONFIRM_TRANSFER:
      return buildReducer(state, action, type, 'confirmation')
    default:
      return state
  }
}

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

export const confirmPaymentMethod = (state = initState({ confirmation: {} }), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.CONFIRM_PAYMENT_METHOD:
      return buildReducer(state, action, type, 'confirmation')
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

export const getDokuInvoice = (state = initState({ invoice: {} }), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.GET_DOKU_INVOICE:
      return buildReducer(state, action, type, 'invoice')
    default:
      return state
  }
}

export const payDoku = (state = initState({ payment: {} }), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.PAY_DOKU:
      return buildReducer(state, action, type, 'payment')
    default:
      return state
  }
}

export const withdraw = (state = initState(), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.WITHDRAW:
      return buildReducer(state, action, type)
    default:
      return state
  }
}

import * as actions from '../actions/payment'
import { buildInitState, createReducer, succState } from '../config'

export const getPaymentMethods = createReducer(buildInitState({ paymentMethods: [] }))
  .addReducer({
    type: actions.GET_PAYMENT_METHODS,
    resultName: 'paymentMethods'
  }).run()

export const confirmTransfer = createReducer(buildInitState())
  .addReducer({
    type: actions.CONFIRM_TRANSFER,
    resultName: 'confirmation'
  })
  .addReducer({
    type: actions.BALANCE_PAYMENT
  }).run()

export const getMidtransToken = createReducer(buildInitState())
  .addReducer({
    type: actions.GET_MIDTRANS_TOKEN,
    customSuccState: (state, action) => ({ ...succState(action), token: action.data.token })
  }).run()

export const getMidtransToken2 = createReducer(buildInitState())
  .addReducer({
    type: actions.GET_MIDTRANS_TOKEN_2,
    customSuccState: (state, action) => ({ ...succState(action), token: action.data.token })
  }).run()

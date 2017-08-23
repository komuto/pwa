import * as actions from '../actions/payment'
import * as apis from '../api/payment'
import { buildSaga } from '../config'

export const getPaymentMethods = buildSaga(apis.getPaymentMethods, actions.GET_PAYMENT_METHODS)
export const confirmTransfer = buildSaga(apis.confirmTransfer, actions.CONFIRM_TRANSFER)
export const getDokuInvoice = buildSaga(apis.getDokuInvoice, actions.GET_DOKU_INVOICE)
export const payDoku = buildSaga(apis.payDoku, actions.PAY_DOKU)
export const withdraw = buildSaga(apis.withdraw, actions.WITHDRAW)

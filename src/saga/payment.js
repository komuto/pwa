import * as actions from '../actions/payment'
import * as apis from '../api/payment'
import { buildSaga } from '../config'

export const getPaymentMethods = buildSaga([], apis.getPaymentMethods, actions.GET_PAYMENT_METHODS)
export const choosePaymentMethod = buildSaga([], apis.choosePaymentMethod, actions.CHOOSE_PAYMENT_METHOD)
export const confirmTransfer = buildSaga([], apis.confirmTransfer, actions.CONFIRM_TRANSFER)

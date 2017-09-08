import { buildAction, typeReq } from '../config'

export const LIST_TRANSACTIONS = 'LIST_TRANSACTIONS'
export const GET_TRANSACTION = 'GET_TRANSACTION'
export const GET_SALDO_HISTORY = 'GET_SALDO_HISTORY'
export const GET_BUYER_INVOICE_DETAIL = 'GET_BUYER_INVOICE_DETAIL'

/**
 * @state listTransactions
 */
export const listTransactions = () => buildAction(typeReq(LIST_TRANSACTIONS))

/**
 * @params id {int} transaction id
 * @state transaction
 */
export const getTransaction = params => buildAction(typeReq(GET_TRANSACTION), params)

/**
 * @state saldoHistory
 */
export const getSaldoHistory = () => buildAction(typeReq(GET_SALDO_HISTORY))

/**
 * @params id {int} transaction id
 * @params invoiceId {int}
 * @state buyerInvoiceDetail
 */
export const getBuyerInvoiceDetail = params => buildAction(typeReq(GET_BUYER_INVOICE_DETAIL), params)

import { buildAction, typeReq } from '../config'

export const LIST_TRANSACTIONS = 'LIST_TRANSACTIONS'
export const GET_TRANSACTION = 'GET_TRANSACTION'

/**
 * @state listTransactions
 */
export const listTransactions = () => buildAction(typeReq(LIST_TRANSACTIONS))

/**
 * @param id {int} transaction id
 * @state transaction
 */
export const getTransaction = params => buildAction(typeReq(GET_TRANSACTION), params)

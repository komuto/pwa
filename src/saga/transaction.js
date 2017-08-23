import * as apis from '../api/transaction'
import * as actions from '../actions/transaction'
import { buildSaga } from '../config'

export const listTransactions = buildSaga(apis.listTransactions, actions.LIST_TRANSACTIONS)
export const getTransaction = buildSaga(apis.getTransaction, actions.GET_TRANSACTION)

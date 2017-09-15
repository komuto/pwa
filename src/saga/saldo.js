import * as actions from '../actions/saldo'
import * as apis from '../api/saldo'
import { buildSaga } from '../config'

export const getSaldoToken = buildSaga(apis.getSaldoToken, actions.GET_SALDO_TOKEN)
export const getNominals = buildSaga(apis.getNominals, actions.GET_NOMINALS)
export const getSaldoHistory = buildSaga(apis.getSaldoHistory, actions.GET_SALDO_HISTORY)
export const withdraw = buildSaga(apis.withdraw, actions.WITHDRAW)

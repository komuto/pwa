import * as actions from '../actions/saldo'
import * as apis from '../api/saldo'
import { buildSaga } from '../config'

export const getSaldoToken = buildSaga(apis.getSaldoToken, actions.GET_SALDO_TOKEN)
export const getNominals = buildSaga(apis.getNominals, actions.GET_NOMINALS)
export const getSaldoHistory = buildSaga(apis.getSaldoHistory, actions.GET_SALDO_HISTORY)
export const withdraw = buildSaga(apis.withdraw, actions.WITHDRAW)
export const getTopupStatus = buildSaga(apis.getTopupStatus, actions.GET_TOPUP_STATUS)
export const getWithdrawStatus = buildSaga(apis.getWithdrawStatus, actions.GET_WITHDRAW_STATUS)
export const getSaldoHistoryDetail = buildSaga(apis.getSaldoHistoryDetail, actions.GET_SALDO_HISTORY_DETAIL)

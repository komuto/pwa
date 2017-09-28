import { buildAction, typeReq } from '../config'

export const GET_SALDO_TOKEN = 'GET_SALDO_TOKEN'
export const GET_NOMINALS = 'GET_NOMINALS'
export const GET_SALDO_HISTORY = 'GET_SALDO_HISTORY'
export const GET_SALDO_HISTORY_DETAIL = 'GET_SALDO_HISTORY_DETAIL'
export const WITHDRAW = 'WITHDRAW'
export const GET_TOPUP_STATUS = 'GET_TOPUP_STATUS'
export const GET_WITHDRAW_STATUS = 'GET_WITHDRAW_STATUS'

/**
 * @param id {int} nominal id
 * @params params are the same as the api query
 * @state saldoToken
 */
export const getSaldoToken = params => buildAction(typeReq(GET_SALDO_TOKEN), params)

/**
 * @state nominals
 */
export const getNominals = () => buildAction(typeReq(GET_NOMINALS))

/**
 * @params params are the same as the api query
 * @state saldoHistory
 */
export const getSaldoHistory = params => buildAction(typeReq(GET_SALDO_HISTORY), params)

/**
 * @param params are the same as the api
 * @state withdrawal
 */
export const withdraw = params => buildAction(typeReq(WITHDRAW), params)

/**
 * @params params are the same as the api query
 * @state topupStatus
 */
export const getTopupStatus = params => buildAction(typeReq(GET_TOPUP_STATUS), params)

/**
 * @params params are the same as the api query
 * @state withdrawStatus
 */
export const getWithdrawStatus = params => buildAction(typeReq(GET_WITHDRAW_STATUS), params)

/**
 * @params id {int} transaction id
 * @state saldoHistoryDetail
 */
export const getSaldoHistoryDetail = params => buildAction(typeReq(GET_SALDO_HISTORY_DETAIL), params)

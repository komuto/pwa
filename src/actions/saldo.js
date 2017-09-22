import { buildAction, typeReq } from '../config'

export const GET_SALDO_TOKEN = 'GET_SALDO_TOKEN'
export const GET_NOMINALS = 'GET_NOMINALS'
export const GET_SALDO_HISTORY = 'GET_SALDO_HISTORY'
export const WITHDRAW = 'WITHDRAW'
export const GET_TOPUP_STATUS = 'GET_TOPUP_STATUS'
export const GET_WITHDRAW_STATUS = 'GET_WITHDRAW_STATUS'

/**
 * @param id {int} nominal id
 * @state saldoToken
 */
export const getSaldoToken = params => buildAction(typeReq(GET_SALDO_TOKEN), params)

/**
 * @state nominals
 */
export const getNominals = () => buildAction(typeReq(GET_NOMINALS))

/**
 * @state saldoHistory
 */
export const getSaldoHistory = () => buildAction(typeReq(GET_SALDO_HISTORY))

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

import { buildAction, typeReq } from '../config'

export const GET_SALDO_TOKEN = 'GET_SALDO_TOKEN'
export const GET_NOMINALS = 'GET_NOMINALS'
export const GET_SALDO_HISTORY = 'GET_SALDO_HISTORY'
export const WITHDRAW = 'WITHDRAW'

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

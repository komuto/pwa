import { buildAction, typeReq } from '../config'

export const GET_COMMISSION = 'GET_COMMISSION'

/**
 * @params params are the same as the api query
 * @state commission
 */
export const getCommission = params => buildAction(typeReq(GET_COMMISSION), params)

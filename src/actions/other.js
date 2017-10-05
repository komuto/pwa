import { buildAction, typeReq } from '../config'

export const GET_COMMISSION = 'GET_COMMISSION'
export const GET_SALE_COUNT = 'GET_SALE_COUNT'

/**
 * @params params are the same as the api query
 * @state commission
 */
export const getCommission = params => buildAction(typeReq(GET_COMMISSION), params)

/**
 * @state saleCount
 */
export const getSaleCount = () => buildAction(typeReq(GET_SALE_COUNT))

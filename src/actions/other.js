import { buildAction, typeReq, typeReset } from '../config'

export const GET_COMMISSION = 'GET_COMMISSION'
export const GET_SALE_COUNT = 'GET_SALE_COUNT'
export const GET_MARKETPLACE = 'GET_MARKETPLACE'
export const GET_BANNER = 'GET_BANNER'

/**
 * @params params are the same as the api query
 * @state commission
 */
export const getCommission = params => buildAction(typeReq(GET_COMMISSION), params)

/**
 * @state saleCount
 */
export const getSaleCount = () => buildAction(typeReq(GET_SALE_COUNT))

export const getMarketPlace = () => buildAction(typeReq(GET_MARKETPLACE))
export const resetMarketPlace = () => buildAction(typeReset(GET_MARKETPLACE))

export const getBanner = () => buildAction(typeReq(GET_BANNER))

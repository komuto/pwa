import { buildAction, typeReq } from '../config'

export const GET_EXPEDITION = 'GET_EXPEDITION'
export const GET_EXPEDITION_SERVICES = 'GET_EXPEDITION_SERVICES'
export const GET_SHIPPING_CHARGE = 'GET_SHIPPING_CHARGE'
export const ESTIMATED_SHIPPING = 'ESTIMATED_SHIPPING'
export const UPDATE_EXPEDITION = 'UPDATE_EXPEDITION'
export const GET_STORE_EXPEDITIONS = 'GET_STORE_EXPEDITIONS'

export const getExpedition = () => buildAction(typeReq(GET_EXPEDITION))
export const getServices = () => buildAction(typeReq(GET_EXPEDITION_SERVICES))
export const estimatedShipping = params => buildAction(typeReq(ESTIMATED_SHIPPING), params)
export const getShippingCharge = params => buildAction(typeReq(GET_SHIPPING_CHARGE), params)
export const updateExpedition = params => buildAction(typeReq(UPDATE_EXPEDITION), params)
export const getStoreExpeditions = () => buildAction(typeReq(GET_STORE_EXPEDITIONS))

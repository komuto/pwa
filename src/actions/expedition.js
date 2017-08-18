import { buildAction, typeReq } from '../config'

export const GET_EXPEDITION = 'GET_EXPEDITION'
export const GET_EXPEDITION_SERVICES = 'GET_EXPEDITION_SERVICES'
export const GET_SHIPPING_CHARGE = 'GET_SHIPPING_CHARGE'
export const ESTIMATED_SHIPPING = 'ESTIMATED_SHIPPING'
export const UPDATE_EXPEDITION = 'UPDATE_EXPEDITION'
export const GET_STORE_EXPEDITIONS = 'GET_STORE_EXPEDITIONS'
export const MANAGE_STORE_EXPEDITIONS = 'MANAGE_STORE_EXPEDITIONS'

/**
 * @state expeditions
 */
export const getExpedition = () => buildAction(typeReq(GET_EXPEDITION))

/**
 * @state expeditionServices
 */
export const getServices = () => buildAction(typeReq(GET_EXPEDITION_SERVICES))

/**
 * @param id {int} product id
 * @param originId {int} origin ro id
 * @param destination_id {int} destination ro id
 * @param weight {int}
 * @state estimatedCharges
 */
export const estimatedShipping = params => buildAction(typeReq(ESTIMATED_SHIPPING), params)

/**
 * @param id {int} expedition id
 * @param originId {int} origin ro id
 * @param destination_id {int} destination ro id
 * @param weight {int}
 * @state shippingCharges
 */
export const getShippingCharge = params => buildAction(typeReq(GET_SHIPPING_CHARGE), params)

/**
 * @param data {array} the params are the same as api
 * @state updateExpedition
 */
export const updateExpedition = params => buildAction(typeReq(UPDATE_EXPEDITION), params)

/**
 * @state storeExpeditions
 */
export const getStoreExpeditions = () => buildAction(typeReq(GET_STORE_EXPEDITIONS))

/**
 * @state manageExpeditions
 */
export const manageStoreExpeditions = () => buildAction(typeReq(MANAGE_STORE_EXPEDITIONS))

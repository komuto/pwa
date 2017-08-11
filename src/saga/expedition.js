import * as actions from '../actions/expedition'
import * as apis from '../api/expedition'
import { buildSaga } from '../config'

export const getExpedition = buildSaga([], apis.getExpedition, actions.GET_EXPEDITION)
export const getServices = buildSaga([], apis.getServices, actions.GET_EXPEDITION_SERVICES)
export const estimatedCharge = buildSaga([], apis.estimatedShipping, actions.ESTIMATED_SHIPPING)
export const getShippingCharge = buildSaga([], apis.getShippingCharge, actions.GET_SHIPPING_CHARGE)
export const updateExpedition = buildSaga([], apis.updateExpedition, actions.UPDATE_EXPEDITION)
export const getStoreExpeditions = buildSaga([], apis.getStoreExpeditions, actions.GET_STORE_EXPEDITIONS)
export const manageStoreExpeditions = buildSaga([], apis.manageStoreExpeditions, actions.MANAGE_STORE_EXPEDITIONS)

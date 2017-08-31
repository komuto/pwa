import * as actions from '../actions/expedition'
import { buildInitState, createReducer } from '../config'

export const expedition = createReducer(buildInitState({ expeditions: [] }))
  .addReducer({
    type: actions.GET_EXPEDITION,
    resultName: 'expeditions'
  }).run()

export const expeditionServices = createReducer(buildInitState({ expeditionServices: [] }))
  .addReducer({
    type: actions.GET_EXPEDITION_SERVICES,
    resultName: 'expeditionServices'
  }).run()

export const estimatedShipping = createReducer(buildInitState({ charges: [] }))
  .addReducer({
    type: actions.ESTIMATED_SHIPPING,
    resultName: 'charges'
  }).run()

export const shippingCharge = createReducer(buildInitState({ charges: [] }))
  .addReducer({
    type: actions.GET_SHIPPING_CHARGE,
    resultName: 'charges'
  }).run()

export const updateExpediton = createReducer(buildInitState())
  .addReducer({
    type: actions.UPDATE_EXPEDITION
  }).run()

export const getStoreExpeditions = createReducer(buildInitState({ storeExpeditions: [] }))
  .addReducer({
    type: actions.GET_STORE_EXPEDITIONS,
    resultName: 'storeExpeditions'
  }).run()

export const manageStoreExpeditions = createReducer(buildInitState({ manageExpeditions: [] }))
  .addReducer({
    type: actions.MANAGE_STORE_EXPEDITIONS,
    resultName: 'manageExpeditions'
  }).run()

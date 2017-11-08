import * as actions from '../actions/location'
import { buildInitState, createReducer } from '../config'

export const province = createReducer(buildInitState({ products: [] }, true))
  .addReducer({
    type: actions.GET_PROVINCE,
    resultName: 'provinces'
  }).run()

export const district = createReducer(buildInitState({ products: [] }, true))
  .addReducer({
    type: actions.GET_DISTRICT,
    resultName: 'districts'
  }).run()

export const subdistrict = createReducer(buildInitState({ products: [] }, true))
  .addReducer({
    type: actions.GET_SUBDISTRICT,
    resultName: 'subdistricts'
  }).run()

export const village = createReducer(buildInitState({ villages: [] }))
  .addReducer({
    type: actions.GET_VILLAGE,
    resultName: 'villages'
  }).run()

import * as actions from '../actions/brand'
import { buildInitState, createReducer } from '../config'

export const brand = createReducer(buildInitState({ brands: [] }))
  .addReducer({
    type: actions.GET_BRAND,
    resultName: 'brands'
  }).run()

export const brandByCategory = createReducer(buildInitState({ brands: [] }))
  .addReducer({
    type: actions.BRAND_BY_CATEGORY,
    resultName: 'brands'
  }).run()

import * as actions from '../actions/other'
import { buildInitState, createReducer } from '../config'

export const getCommission = createReducer(buildInitState({ commission: {} }, true))
  .addReducer({
    type: actions.GET_COMMISSION,
    resultName: 'commission'
  }).run()

export const getSaleCount = createReducer(buildInitState({ count: {} }))
  .addReducer({
    type: actions.GET_SALE_COUNT,
    resultName: 'count'
  }).run()

export const getMarketPlace = createReducer(buildInitState({ data: {} }))
.addReducer({
  type: actions.GET_MARKETPLACE,
  resultName: 'data'
}).run()

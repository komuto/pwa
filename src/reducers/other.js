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
    resultName: 'data',
    includeNonSaga: true
  }).run()

export const getMarketPlaceCommission = createReducer(buildInitState({ commission: {} }))
  .addReducer({
    type: actions.GET_MARKETPLACE_COMMISSION,
    resultName: 'commission'
  }).run()

export function setMarketPlaceTemp (state = {}, action) {
  switch (action.type) {
    case actions.SET_MARKETPLACE:
      return {
        ...state,
        ...action
      }
    default:
      return state
  }
}

export const getBanner = createReducer(buildInitState({ data: {} }))
  .addReducer({
    type: actions.GET_BANNER,
    resultName: 'data'
  }).run()

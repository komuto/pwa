import * as actions from '../actions/other'
import * as apis from '../api/other'
import { buildSaga, buildSagaDelay } from '../config'

export const getCommission = buildSagaDelay(apis.getCommission, actions.GET_COMMISSION)
export const getSaleCount = buildSaga(apis.getSaleCount, actions.GET_SALE_COUNT)
export const getMarketPlace = buildSaga(apis.getMarketPlace, actions.GET_MARKETPLACE)
export const getMarketPlaceCommission = buildSaga(apis.getMarketPlaceCommission, actions.GET_MARKETPLACE_COMMISSION)
export const getBanner = buildSaga(apis.getBanner, actions.GET_BANNER)

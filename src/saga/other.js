import * as actions from '../actions/other'
import * as apis from '../api/other'
import { buildSaga } from '../config'

export const getCommission = buildSaga(apis.getCommission, actions.GET_COMMISSION)
export const getSaleCount = buildSaga(apis.getSaleCount, actions.GET_SALE_COUNT)

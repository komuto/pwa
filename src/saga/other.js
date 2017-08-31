import * as actions from '../actions/other'
import * as apis from '../api/other'
import { buildSaga } from '../config'

export const getCommission = buildSaga(apis.getCommission, actions.GET_COMMISSION)

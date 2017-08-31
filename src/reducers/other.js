import * as actions from '../actions/other'
import { buildInitState, createReducer } from '../config'

export const getCommission = createReducer(buildInitState({ commission: {} }))
  .addReducer({
    type: actions.GET_COMMISSION,
    resultName: 'commission'
  }).run()

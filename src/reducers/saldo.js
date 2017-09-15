import * as actions from '../actions/saldo'
import { succState, buildInitState, createReducer } from '../config'

export const getSaldoToken = createReducer(buildInitState())
  .addReducer({
    type: actions.GET_SALDO_TOKEN,
    customSuccState: (state, action) => ({ ...succState(action), token: action.data.token })
  }).run()

export const getNominals = createReducer(buildInitState({ nominals: [] }))
  .addReducer({
    type: actions.GET_NOMINALS,
    resultName: 'nominals'
  }).run()

export const getSaldoHistory = createReducer(buildInitState({ history: [] }))
  .addReducer({
    type: actions.GET_SALDO_HISTORY,
    resultName: 'history'
  }).run()

export const withdraw = createReducer(buildInitState())
  .addReducer({
    type: actions.WITHDRAW
  }).run()

import * as actions from '../actions/transaction'
import { buildReducer, buildType, initState } from '../config'

export const listTransactions = (state = initState({ listTransactions: [] }), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.LIST_TRANSACTIONS:
      return buildReducer(state, action, type, 'listTransactions')
    default:
      return state
  }
}

export const getTransaction = (state = initState({ transaction: {} }), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.GET_TRANSACTION:
      return buildReducer(state, action, type, 'transaction')
    default:
      return state
  }
}

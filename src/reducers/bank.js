import * as actions from '../actions/bank'
import { buildReducer, buildType, initState } from '../config'

export const listBank = (state = initState({ banks: [] }), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.LIST_BANK:
      return buildReducer(state, action, type, 'banks')
    default:
      return state
  }
}

export const getBank = (state = initState({ bank: {} }), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.GET_BANK:
      return buildReducer(state, action, type, 'bank')
    default:
      return state
  }
}

export const bankAccount = (state = initState({ bankAccount: {} }), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.ADD_BANK_ACCOUNT:
      return { ...buildReducer(state, action, type, 'bankAccount'), type: 'add' }
    case actions.UPDATE_BANK_ACCOUNT:
      return { ...buildReducer(state, action, type, 'bankAccount'), type: 'update' }
    case actions.DELETE_BANK_ACCOUNT:
      return { ...buildReducer(state, action, type), type: 'delete' }
    default:
      return state
  }
}

export const getBankAccounts = (state = initState({ listBankAccounts: [] }), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.GET_BANK_ACCOUNTS:
      return buildReducer(state, action, type, 'listBankAccounts')
    default:
      return state
  }
}

export const getBankAccountDetail = (state = initState({ bankAccountDetail: {} }), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.GET_BANK_ACCOUNT_DETAIL:
      return buildReducer(state, action, type, 'bankAccountDetail')
    default:
      return state
  }
}

export const getKomutoBankAccounts = (state = initState({ komutoAccounts: [] }), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.GET_KOMUTO_BANK_ACCOUNTS:
      return buildReducer(state, action, type, 'komutoAccounts')
    default:
      return state
  }
}

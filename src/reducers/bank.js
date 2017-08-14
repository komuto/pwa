import * as actions from '../actions/bank'
import { buildReducer, buildType, initState } from '../config'

const initListBank = {
  banks: [],
  ...initState()
}

const initBank = {
  bank: '',
  ...initState()
}

const initBankAccount = {
  bankAccount: {},
  ...initState()
}

const initBankAccounts = {
  listBankAccounts: [],
  ...initState()
}

export const listBank = (state = initListBank, action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.LIST_BANK:
      return buildReducer(state, action, type, 'banks')
    default:
      return state
  }
}

export const getBank = (state = initBank, action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.GET_BANK:
      return buildReducer(state, action, type, 'bank')
    default:
      return state
  }
}

export const bankAccount = (state = initBankAccount, action) => {
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

export const getBankAccounts = (state = initBankAccounts, action) => {
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

import * as actions from '../actions/bank'
import { buildInitState, createReducer } from '../config'

export const listBank = createReducer(buildInitState({ banks: [] }))
  .addReducer({
    type: actions.LIST_BANK,
    resultName: 'banks'
  }).run()

export const getBank = createReducer(buildInitState({ bank: {} }))
  .addReducer({
    type: actions.GET_BANK,
    resultName: 'bank'
  }).run()

export const bankAccount = createReducer(buildInitState({ bankAccount: {} }))
  .addReducer({
    type: actions.ADD_BANK_ACCOUNT,
    resultName: 'bankAccount',
    add: { type: 'add' }
  })
  .addReducer({
    type: actions.UPDATE_BANK_ACCOUNT,
    resultName: 'bankAccount',
    add: { type: 'update' }
  })
  .addReducer({
    type: actions.DELETE_BANK_ACCOUNT,
    add: { type: 'delete' }
  }).run()

export const getBankAccounts = createReducer(buildInitState({ listBankAccounts: [] }))
  .addReducer({
    type: actions.GET_BANK_ACCOUNTS,
    resultName: 'listBankAccounts'
  }).run()

export const getBankAccountDetail = createReducer(buildInitState({ bankAccountDetail: {} }))
  .addReducer({
    type: actions.GET_BANK_ACCOUNT_DETAIL,
    resultName: 'bankAccountDetail'
  }).run()

export const getKomutoBankAccounts = createReducer(buildInitState({ komutoAccounts: [] }))
  .addReducer({
    type: actions.GET_KOMUTO_BANK_ACCOUNTS,
    resultName: 'komutoAccounts'
  }).run()

import * as actions from '../actions/bank'
import * as apis from '../api/bank'
import { buildSaga, getState } from '../config'

export const listBank = buildSaga(apis.listBank, actions.LIST_BANK)
export const getBank = buildSaga(apis.getBank, actions.GET_BANK)
export const addBankAccount = buildSaga(apis.addBankAccount, actions.ADD_BANK_ACCOUNT)
export const getBankAccounts = buildSaga(apis.getBankAccounts, actions.GET_BANK_ACCOUNTS)
export const getBankAccountDetail = buildSaga(apis.getBankAccounts, actions.GET_BANK_ACCOUNT_DETAIL,
  getState({ from: (state) => state.listBankAccounts.listBankAccounts }))
export const updateBankAccount = buildSaga(apis.updateBankAccount, actions.UPDATE_BANK_ACCOUNT)
export const deleteBankAccount = buildSaga(apis.deleteBankAccount, actions.DELETE_BANK_ACCOUNT)
export const getKomutoBankAccounts = buildSaga(apis.getKomutoBankAccounts, actions.GET_KOMUTO_BANK_ACCOUNTS)

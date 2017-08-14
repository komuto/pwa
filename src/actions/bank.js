import { buildAction, typeReq } from '../config'

export const LIST_BANK = 'LIST_BANK'
export const GET_BANK = 'GET_BANK'
export const ADD_BANK_ACCOUNT = 'ADD_BANK_ACCOUNT'
export const GET_BANK_ACCOUNTS = 'GET_BANK_ACCOUNTS'
export const GET_BANK_ACCOUNT_DETAIL = 'GET_BANK_ACCOUNT_DETAIL'
export const UPDATE_BANK_ACCOUNT = 'UPDATE_BANK_ACCOUNT'
export const DELETE_BANK_ACCOUNT = 'DELETE_BANK_ACCOUNT'
export const GET_KOMUTO_BANK_ACCOUNTS = 'GET_KOMUTO_BANK_ACCOUNTS'

export const listBank = params => buildAction(typeReq(LIST_BANK), params)
export const getBank = params => buildAction(typeReq(GET_BANK), params)
export const addBankAccount = params => buildAction(typeReq(ADD_BANK_ACCOUNT), params)
export const updateBankAccount = params => buildAction(typeReq(UPDATE_BANK_ACCOUNT), params)
export const deleteBankAccount = params => buildAction(typeReq(DELETE_BANK_ACCOUNT), params)
export const getBankAccounts = () => buildAction(typeReq(GET_BANK_ACCOUNTS))
export const getBankAccountDetail = params => buildAction(typeReq(GET_BANK_ACCOUNT_DETAIL), params)
export const getKomutoBankAccounts = () => buildAction(typeReq(GET_KOMUTO_BANK_ACCOUNTS))

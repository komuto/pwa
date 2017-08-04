import { buildAction, typeReq } from '../config'

export const LIST_BANK = 'LIST_BANK'
export const CREATE_BANK = 'CREATE_BANK'
export const GET_BANK = 'GET_BANK'
export const ADD_BANK_ACCOUNT = 'ADD_BANK_ACCOUNT'
export const GET_BANK_ACCOUNTS = 'GET_BANK_ACCOUNTS'
export const UPDATE_BANK_ACCOUNT = 'UPDATE_BANK_ACCOUNT'
export const DELETE_BANK_ACCOUNT = 'DELETE_BANK_ACCOUNT'

// function newBank ()
export const listBank = params => buildAction(typeReq(LIST_BANK), params)
export const getBank = params => buildAction(typeReq(GET_BANK), params)
export const addBankAccount = params => buildAction(typeReq(ADD_BANK_ACCOUNT), params)
export const updateBankAccount = params => buildAction(typeReq(UPDATE_BANK_ACCOUNT), params)
export const deleteBankAccount = params => buildAction(typeReq(DELETE_BANK_ACCOUNT), params)
export const getBankAccounts = params => buildAction(typeReq(GET_BANK_ACCOUNTS), params)

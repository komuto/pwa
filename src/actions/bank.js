import { buildAction, typeReq } from '../config'

export const LIST_BANK = 'LIST_BANK'
export const GET_BANK = 'GET_BANK'
export const ADD_BANK_ACCOUNT = 'ADD_BANK_ACCOUNT'
export const GET_BANK_ACCOUNTS = 'GET_BANK_ACCOUNTS'
export const GET_BANK_ACCOUNT_DETAIL = 'GET_BANK_ACCOUNT_DETAIL'
export const UPDATE_BANK_ACCOUNT = 'UPDATE_BANK_ACCOUNT'
export const DELETE_BANK_ACCOUNT = 'DELETE_BANK_ACCOUNT'
export const GET_KOMUTO_BANK_ACCOUNTS = 'GET_KOMUTO_BANK_ACCOUNTS'

/**
 * @state banks
 */
export const listBank = () => buildAction(typeReq(LIST_BANK))

/**
 * @params id {int} bank id
 * @state bank
 */
export const getBank = params => buildAction(typeReq(GET_BANK), params)

/**
 * @param params are the same as the api
 * @state bankAccount
 */
export const addBankAccount = params => buildAction(typeReq(ADD_BANK_ACCOUNT), params)

/**
 * @param id {int} bank account id
 * @param params are the same as the api
 * @state bankAccount
 */
export const updateBankAccount = params => buildAction(typeReq(UPDATE_BANK_ACCOUNT), params)

/**
 * @param id {int} bank account id
 * @param params are the same as the api
 * @state bankAccount
 */
export const deleteBankAccount = params => buildAction(typeReq(DELETE_BANK_ACCOUNT), params)

/**
 * @state listBankAccounts
 */
export const getBankAccounts = () => buildAction(typeReq(GET_BANK_ACCOUNTS))

/**
 * @params id {int} bank account id
 * @state bankAccountDetail
 */
export const getBankAccountDetail = params => buildAction(typeReq(GET_BANK_ACCOUNT_DETAIL), params)

/**
 * @state komutoAccounts
 */
export const getKomutoBankAccounts = () => buildAction(typeReq(GET_KOMUTO_BANK_ACCOUNTS))

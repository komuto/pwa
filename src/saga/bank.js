import { put } from 'redux-saga/effects'
import * as actions from '../actions/bank'
import * as apis from '../api/bank'
import { errorHandling, typeSucc, typeFail, buildSaga } from '../config'

function * listBank (action) {
  try {
    const {data} = yield apis.listBank(action)
    yield put({ type: typeSucc(actions.LIST_BANK), ...data })
  } catch (e) {
    yield errorHandling(typeFail(actions.LIST_BANK), e)
  }
}

function * getBank (action) {
  try {
    const {data} = yield apis.getBank(action)
    yield put({ type: typeSucc(actions.GET_BANK), ...data })
  } catch (e) {
    yield errorHandling(typeFail(actions.GET_BANK), e)
  }
}

export const addBankAccount = function * (action) {
  try {
    const { data } = yield apis.addBankAccount(action)
    yield put({ type: typeSucc(actions.ADD_BANK_ACCOUNT), ...data })
  } catch (e) {
    yield errorHandling(typeFail(actions.ADD_BANK_ACCOUNT), e)
  }
}

export const getBankAccounts = function * ({ id }) {
  try {
    const { data } = yield apis.getBankAccounts(id)
    yield put({ type: typeSucc(actions.GET_BANK_ACCOUNTS), ...data })
  } catch (e) {
    yield errorHandling(typeFail(actions.GET_BANK_ACCOUNTS), e)
  }
}

export const updateBankAccount = buildSaga([], apis.updateBankAccount, actions.UPDATE_BANK_ACCOUNT)
export const deleteBankAccount = buildSaga(['id', 'code'], apis.deleteBankAccount, actions.DELETE_BANK_ACCOUNT)

export {
  listBank,
  getBank
}

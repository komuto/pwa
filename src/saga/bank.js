import { put } from 'redux-saga/effects'
import * as actions from '../actions/bank'
import * as apis from '../api/bank'
import { errorHandling } from '../config'

function * listBank (action) {
  try {
    const {data} = yield apis.listBank(action)
    yield put({ type: actions.LIST_BANK_SUCCESS, ...data })
  } catch (e) {
    yield errorHandling(actions.LIST_BANK_FAILURE, e)
  }
}

function * getBank (action) {
  try {
    const {data} = yield apis.getBank(action)
    yield put({ type: actions.GET_BANK_SUCCESS, ...data })
  } catch (e) {
    yield errorHandling(actions.GET_BANK_FAILURE, e)
  }
}

export {
  listBank,
  getBank
}

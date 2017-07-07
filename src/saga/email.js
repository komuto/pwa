import { put } from 'redux-saga/effects'
import * as actions from '../actions/email'
import * as apis from '../api/email'
import { errorHandling } from '../config'

function * checkEmail (action) {
  try {
    const {data} = yield apis.checkEmail(action)
    yield put({ type: actions.CHECK_EMAILVALIDITY_SUCCESS, ...data })
  } catch (e) {
    yield errorHandling(actions.CHECK_EMAILVALIDITY_FAILURE, e)
  }
}

export {
  checkEmail
}

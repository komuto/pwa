import { put } from 'redux-saga/effects'
import * as actions from '../actions/email'
import * as apis from '../api/email'
import { errorHandling, typeSucc, typeFail } from '../config'

function * checkEmail (action) {
  try {
    const {data} = yield apis.checkEmail(action)
    yield put({ type: typeSucc(actions.CHECK_EMAIL_VALIDITY), ...data })
  } catch (e) {
    yield errorHandling(typeFail(actions.CHECK_EMAIL_VALIDITY), e)
  }
}

export {
  checkEmail
}

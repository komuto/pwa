import * as userActions from '../actions/user'
import * as userSaga from './user'
import { takeEvery } from 'redux-saga/effects'

function * dataSaga () {
  yield takeEvery(userActions.USER_REGISTER_REQUEST, userSaga.register)
  yield takeEvery(userActions.USER_LOGIN_REQUEST, userSaga.login)
  yield takeEvery(userActions.FORGET_PASSWORD_REQUEST, userSaga.forgetPassword)
  yield takeEvery(userActions.LOGIN_SOCIAL_REQUEST, userSaga.loginSocial)
  yield takeEvery(userActions.USER_NEWPASSWORD_REQUEST, userSaga.newPassword)
}

export default dataSaga

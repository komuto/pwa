import { fork, takeLatest } from 'redux-saga/effects'
// redux
import { StartupTypes } from '../Redux/StartupRedux'
// sagas
// server sagas
import { fetchBannerServer } from './BannerSagas'
// client sagas
import { login, logout, forgot } from './AuthSagas'
import { startup } from './StartupSagas'
// api
import API from '../Services/Api'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = API.create()

function* serverSagas () {
  yield [
    fork(fetchBannerServer, api)
  ]
}

function* clientSagas () {
  yield [
    takeLatest(StartupTypes.STARTUP, startup),
    fork(logout),
    fork(login, api),
    fork(forgot, api)
  ]
}

export default function* root () {
  yield [
    fork(serverSagas),
    fork(clientSagas)
  ]
}

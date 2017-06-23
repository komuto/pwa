import { put } from 'redux-saga/effects'
import * as expeditionActions from '../actions/expedition'
import * as expeditionApi from '../api/expedition'

const error = {
  message: 'Your device is offline',
  code: 'ENOENT',
  isOnline: false
}

function * getExpedition (action) {
  try {
    const {data} = yield expeditionApi.getExpedition(action)
    yield put({ type: expeditionActions.GET_EXPEDITION_SUCCESS, ...data })
  } catch (e) {
    const data = e.response
    if (data !== undefined) {
      const {data} = e.response
      data.isOnline = true
      yield put({ type: expeditionActions.GET_EXPEDITION_FAILURE, ...data })
    } else {
      yield put({ type: expeditionActions.GET_EXPEDITION_FAILURE, ...error })
    }
  }
}

export {
  getExpedition
}

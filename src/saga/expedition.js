import { put } from 'redux-saga/effects'
import * as expeditionActions from '../actions/expedition'
import * as expeditionApi from '../api/expedition'
import { errorHandling } from '../config'

function * getExpedition (action) {
  try {
    const {data} = yield expeditionApi.getExpedition(action)
    yield put({ type: expeditionActions.GET_EXPEDITION_SUCCESS, ...data })
  } catch (e) {
    yield errorHandling(expeditionActions.GET_EXPEDITION_FAILURE, e)
  }
}

export {
  getExpedition
}

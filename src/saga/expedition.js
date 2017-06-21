import { put } from 'redux-saga/effects'
import * as expeditionActions from '../actions/expedition'
import * as expeditionApi from '../api/expedition'

function * getExpedition (action) {
  try {
    const {data} = yield expeditionApi.getExpedition(action)
    yield put({ type: expeditionActions.GET_EXPEDITION_SUCCESS, ...data })
  } catch (e) {
    const {data} = e.response
    yield put({ type: expeditionActions.GET_EXPEDITION_FAILURE, ...data })
  }
}

export {
  getExpedition
}

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

function * getServices (action) {
  try {
    const {data} = yield expeditionApi.getServices(action)
    yield put({ type: expeditionActions.GET_EXPEDITIONSERVICES_SUCCESS, ...data })
  } catch (e) {
    yield errorHandling(expeditionActions.GET_EXPEDITIONSERVICES_FAILURE, e)
  }
}

function * getShippingCharge (action) {
  try {
    const {data} = yield expeditionApi.getShippingCharge(action)
    yield put({ type: expeditionActions.GET_SHIPPINGCHARGE_SUCCESS, ...data })
  } catch (e) {
    console.log(e)
    yield errorHandling(expeditionActions.GET_SHIPPINGCHARGE_FAILURE, e)
  }
}

function * updateExpedition (action) {
  try {
    const {data} = yield expeditionApi.updateExpedition(action)
    yield put({ type: expeditionActions.UPDATE_EXPEDITION_SUCCESS, ...data })
  } catch (e) {
    console.log(e)
    yield errorHandling(expeditionActions.UPDATE_EXPEDITION_FAILURE, e)
  }
}

export {
  getExpedition,
  getServices,
  getShippingCharge,
  updateExpedition
}

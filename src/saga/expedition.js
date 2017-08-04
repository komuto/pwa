import { put } from 'redux-saga/effects'
import * as actions from '../actions/expedition'
import * as apis from '../api/expedition'
import { errorHandling, typeSucc, typeFail, buildSaga } from '../config'

function * getExpedition (action) {
  try {
    const {data} = yield apis.getExpedition(action)
    yield put({ type: typeSucc(actions.GET_EXPEDITION), ...data })
  } catch (e) {
    yield errorHandling(typeFail(actions.GET_EXPEDITION), e)
  }
}

function * getServices (action) {
  try {
    const {data} = yield apis.getServices(action)
    yield put({ type: typeSucc(actions.GET_EXPEDITION_SERVICES), ...data })
  } catch (e) {
    yield errorHandling(typeFail(actions.GET_EXPEDITION_SERVICES), e)
  }
}

function * estimatedCharge (action) {
  try {
    const {data} = yield apis.estimatedShipping(action)
    yield put({ type: typeSucc(actions.ESTIMATED_SHIPPING), ...data })
  } catch (e) {
    yield errorHandling(typeFail(actions.ESTIMATED_SHIPPING), e)
  }
}

function * getShippingCharge (action) {
  try {
    const {data} = yield apis.getShippingCharge(action)
    yield put({ type: typeSucc(actions.GET_SHIPPING_CHARGE), ...data })
  } catch (e) {
    yield errorHandling(typeFail(actions.GET_SHIPPING_CHARGE), e)
  }
}

function * updateExpedition (action) {
  try {
    const {data} = yield apis.updateExpedition(action)
    yield put({ type: typeSucc(actions.UPDATE_EXPEDITION), ...data })
  } catch (e) {
    yield errorHandling(typeFail(actions.UPDATE_EXPEDITION), e)
  }
}

export const getStoreExpeditions = buildSaga([], apis.getStoreExpeditions, actions.GET_STORE_EXPEDITIONS)

export {
  getExpedition,
  getServices,
  estimatedCharge,
  getShippingCharge,
  updateExpedition
}

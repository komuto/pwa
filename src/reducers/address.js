import * as actions from '../actions/address'
import { buildInitState, createReducer } from '../config'

export const getAddressDetail = createReducer(buildInitState({ address: {} }))
  .addReducer({
    type: actions.GET_ADDRESS_DETAIL,
    resultName: 'address'
  }).run()

export const primaryAddress = createReducer(buildInitState({ address: {} }))
  .addReducer({
    type: actions.GET_PRIMARY_ADDRESS,
    resultName: 'address',
    includeNonSaga: true
  }).run()

export const addAddress = createReducer(buildInitState({ address: {} }))
  .addReducer({
    type: actions.ADD_ADDRESS,
    resultName: 'address',
    includeNonSaga: true
  }).run()

export const updateAddress = createReducer(buildInitState({ address: {} }))
  .addReducer({
    type: actions.UPDATE_ADDRESS,
    resultName: 'address'
  }).run()

export const deleteAddress = createReducer(buildInitState({ address: {} }))
  .addReducer({
    type: actions.DELETE_ADDRESS,
    resultName: 'address'
  }).run()

export const listAddress = createReducer(buildInitState({ address: [] }))
  .addReducer({
    type: actions.GET_LIST_ADDRESS,
    resultName: 'address'
  }).run()

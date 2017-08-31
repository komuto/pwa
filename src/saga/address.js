import * as actions from '../actions/address'
import * as apis from '../api/address'
import { buildSaga, getState } from '../config'

export const addAddress = buildSaga(apis.addAddress, actions.ADD_ADDRESS)
export const updateAddress = buildSaga(apis.updateAddress, actions.UPDATE_ADDRESS)
export const deleteAddress = buildSaga(apis.deleteAddress, actions.DELETE_ADDRESS)
export const getListAddress = buildSaga(apis.getListAddress, actions.GET_LIST_ADDRESS)
export const getAddressDetail = buildSaga(apis.getAddressDetail, actions.GET_ADDRESS_DETAIL,
  getState({ from: (state) => state.listAddress.address }))
export const getPrimaryAddress = buildSaga(apis.getPrimaryAddress, actions.GET_PRIMARY_ADDRESS)

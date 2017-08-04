import { buildAction, typeReq } from '../config'

export const ADD_ADDRESS = 'ADD_ADDRESS'
export const ADD_ADDRESS_RESET = 'ADD_ADDRESS_RESET'
export const UPDATE_ADDRESS = 'UPDATE_ADDRESS'
export const DELETE_ADDRESS = 'DELETE_ADDRESS'
export const GET_ADDRESS_DETAIL = 'GET_ADDRESS_DETAIL'
export const GET_LIST_ADDRESS = 'GET_LIST_ADDRESS'
export const GET_PRIMARY_ADDRESS = 'GET_PRIMARY_ADDRESS'
export const STATUS_ADDRESS_RESET = 'STATUS_ADDRESS_RESET'

export const addAddress = params => buildAction(typeReq(ADD_ADDRESS), params)
export const addAddressReset = params => buildAction(ADD_ADDRESS_RESET)
export const updateAddress = params => buildAction(typeReq(UPDATE_ADDRESS), params)
export const deleteAddress = params => buildAction(typeReq(DELETE_ADDRESS), params)
export const getAddressDetail = params => buildAction(typeReq(GET_ADDRESS_DETAIL), params)
export const getListAddress = () => buildAction(typeReq(GET_LIST_ADDRESS))
export const resetStatusAddress = () => buildAction(STATUS_ADDRESS_RESET)
export const getPrimaryAddress = params => buildAction(typeReq(GET_PRIMARY_ADDRESS), params)

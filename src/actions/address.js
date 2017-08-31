import { buildAction, typeReq, typeReset } from '../config'

export const ADD_ADDRESS = 'ADD_ADDRESS'
export const UPDATE_ADDRESS = 'UPDATE_ADDRESS'
export const DELETE_ADDRESS = 'DELETE_ADDRESS'
export const GET_ADDRESS_DETAIL = 'GET_ADDRESS_DETAIL'
export const GET_LIST_ADDRESS = 'GET_LIST_ADDRESS'
export const GET_PRIMARY_ADDRESS = 'GET_PRIMARY_ADDRESS'

/**
 * @param params are the same as the api
 * @state addAddress
 */
export const addAddress = params => buildAction(typeReq(ADD_ADDRESS), params)
export const addAddressReset = () => buildAction(typeReset(ADD_ADDRESS))

/**
 * @param id {int} address id
 * @param params are the same as the api
 * @state updateAddress
 */
export const updateAddress = params => buildAction(typeReq(UPDATE_ADDRESS), params)

/**
 * @params id {int} address id
 * @state deleteAddress
 */
export const deleteAddress = params => buildAction(typeReq(DELETE_ADDRESS), params)

/**
 * @params id {int} address id
 * @state address
 */
export const getAddressDetail = params => buildAction(typeReq(GET_ADDRESS_DETAIL), params)

/**
 * @state listAddress
 */
export const getListAddress = () => buildAction(typeReq(GET_LIST_ADDRESS))

/**
 * @state primaryAddress
 */
export const getPrimaryAddress = () => buildAction(typeReq(GET_PRIMARY_ADDRESS))
export const resetPrimaryAddress = () => buildAction(typeReset(GET_PRIMARY_ADDRESS))

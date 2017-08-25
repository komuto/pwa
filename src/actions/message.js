import { buildAction, typeReq } from '../config'

export const GET_BUYER_MESSAGES = 'GET_BUYER_MESSAGES'
export const GET_BUYER_DETAIL_MESSAGE = 'GET_BUYER_DETAIL_MESSAGE'
export const GET_SELLER_MESSAGES = 'GET_SELLER_MESSAGES'
export const GET_SELLER_DETAIL_MESSAGE = 'GET_SELLER_DETAIL_MESSAGE'
export const ARCHIVE_BUYER_MESSAGE = 'ARCHIVE_BUYER_MESSAGE'
export const ARCHIVE_SELLER_MESSAGE = 'ARCHIVE_SELLER_MESSAGE'

/**
 * @params params are the same as the api query
 * @state buyerMessages
 */
export const getBuyerMessages = params => buildAction(typeReq(GET_BUYER_MESSAGES), params)

/**
 * @params params are the same as the api query
 * @state sellerMessages
 */
export const getSellerMessages = params => buildAction(typeReq(GET_SELLER_MESSAGES), params)

/**
 * @params id {int} message id
 * @state buyerDetailMessage
 */
export const getBuyerDetailMessage = params => buildAction(typeReq(GET_BUYER_DETAIL_MESSAGE), params)

/**
 * @params id {int} message id
 * @state sellerDetailMessage
 */
export const getSellerDetailMessage = params => buildAction(typeReq(GET_SELLER_DETAIL_MESSAGE), params)

/**
 * @params id {int} message id
 * @state archiveMessage
 */
export const archiveBuyerMessage = params => buildAction(typeReq(ARCHIVE_BUYER_MESSAGE), params)

/**
 * @params id {int} message id
 * @state archiveMessage
 */
export const archiveSellerMessage = params => buildAction(typeReq(ARCHIVE_SELLER_MESSAGE), params)


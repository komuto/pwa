import { buildAction, typeReq } from '../config'

export const GET_BUYER_MESSAGES = 'GET_BUYER_MESSAGES'
export const GET_BUYER_DETAIL_MESSAGE = 'GET_BUYER_DETAIL_MESSAGE'
export const GET_SELLER_MESSAGES = 'GET_SELLER_MESSAGES'
export const GET_SELLER_DETAIL_MESSAGE = 'GET_SELLER_DETAIL_MESSAGE'
export const GET_ARCHIVE_BUYER_MESSAGES = 'GET_ARCHIVE_BUYER_MESSAGES'
export const GET_ARCHIVE_SELLER_MESSAGES = 'GET_ARCHIVE_SELLER_MESSAGES'
export const UPDATE_BUYER_MESSAGE = 'UPDATE_BUYER_MESSAGE'
export const UPDATE_SELLER_MESSAGE = 'UPDATE_SELLER_MESSAGE'
export const BUYER_REPLY_MESSAGE = 'BUYER_REPLY_MESSAGE'
export const SELLER_REPLY_MESSAGE = 'SELLER_REPLY_MESSAGE'
export const BUYER_DELETE_MESSAGE = 'BUYER_DELETE_MESSAGE'
export const SELLER_DELETE_MESSAGE = 'SELLER_DELETE_MESSAGE'

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
 * @state archiveBuyerMessages
 */
export const getArchiveBuyerMessages = () => buildAction(typeReq(GET_ARCHIVE_BUYER_MESSAGES))

/**
 * @state archiveSellerMessages
 */
export const getArchiveSellerMessages = () => buildAction(typeReq(GET_ARCHIVE_SELLER_MESSAGES))

/**
 * @params id {int} message id
 * @params messageType {string}
 * @state updateMessage
 */
export const updateBuyerMessage = params => buildAction(typeReq(UPDATE_BUYER_MESSAGE), params)

/**
 * @params id {int} message id
 * @params messageType {string}
 * @state updateMessage
 */
export const updateSellerMessage = params => buildAction(typeReq(UPDATE_SELLER_MESSAGE), params)

/**
 * @params id {int} message id
 * @param params are the same as the api
 * @state replyMessage
 */
export const buyerReplyMessage = params => buildAction(typeReq(BUYER_REPLY_MESSAGE), params)

/**
 * @params id {int} message id
 * @param params are the same as the api
 * @state replyMessage
 */
export const sellerReplyMessage = params => buildAction(typeReq(SELLER_REPLY_MESSAGE), params)

/**
 * @params id {int} message id
 * @state deleteMessage
 */
export const buyerDeleteMessage = params => buildAction(typeReq(BUYER_DELETE_MESSAGE), params)

/**
 * @params id {int} message id
 * @state deleteMessage
 */
export const sellerDeleteMessage = params => buildAction(typeReq(SELLER_DELETE_MESSAGE), params)

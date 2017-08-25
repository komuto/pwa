import * as actions from '../actions/message'
import * as apis from '../api/message'
import { buildSaga } from '../config'

export const getBuyerMessages = buildSaga(apis.getBuyerMessages, actions.GET_BUYER_MESSAGES)
export const getSellerMessages = buildSaga(apis.getSellerMessages, actions.GET_SELLER_MESSAGES)
export const getBuyerDetailMessage = buildSaga(apis.getBuyerDetailMessage, actions.GET_BUYER_DETAIL_MESSAGE)
export const getSellerDetailMessage = buildSaga(apis.getSellerDetailMessage, actions.GET_SELLER_DETAIL_MESSAGE)
export const archiveBuyerMessage = buildSaga(apis.archiveBuyerMessage, actions.ARCHIVE_BUYER_MESSAGE)
export const archiveSellerMessage = buildSaga(apis.archiveSellerMessage, actions.ARCHIVE_SELLER_MESSAGE)


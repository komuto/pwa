import * as actions from '../actions/message'
import { buildInitState, createReducer } from '../config'

export const getBuyerMessages = createReducer(buildInitState({ buyerMessages: [] }))
  .addReducer({
    type: actions.GET_BUYER_MESSAGES,
    resultName: 'buyerMessages'
  }).run()

export const getSellerMessages = createReducer(buildInitState({ sellerMessages: [] }))
  .addReducer({
    type: actions.GET_SELLER_MESSAGES,
    resultName: 'sellerMessages'
  }).run()

export const getBuyerDetailMessage = createReducer(buildInitState({ buyerDetailMessage: {} }))
  .addReducer({
    type: actions.GET_BUYER_DETAIL_MESSAGE,
    resultName: 'buyerDetailMessage'
  }).run()

export const getSellerDetailMessage = createReducer(buildInitState({ sellerDetailMessage: {} }))
  .addReducer({
    type: actions.GET_SELLER_DETAIL_MESSAGE,
    resultName: 'sellerDetailMessage'
  }).run()

export const getArchiveBuyerMessages = createReducer(buildInitState({ archiveMessages: {} }))
  .addReducer({
    type: actions.GET_ARCHIVE_BUYER_MESSAGES,
    resultName: 'archiveMessages'
  }).run()

export const getArchiveSellerMessages = createReducer(buildInitState({ archiveMessage: {} }))
  .addReducer({
    type: actions.GET_ARCHIVE_SELLER_MESSAGES,
    resultName: 'archiveMessages'
  }).run()

export const updateMessage = createReducer(buildInitState({ updateMessage: {} }))
  .addReducer({
    type: actions.UPDATE_BUYER_MESSAGE,
    resultName: 'updateMessage'
  })
  .addReducer({
    type: actions.UPDATE_SELLER_MESSAGE,
    resultName: 'updateMessage'
  }).run()

export const replyMessage = createReducer(buildInitState({ message: {} }))
  .addReducer({
    type: actions.BUYER_REPLY_MESSAGE,
    resultName: 'message'
  })
  .addReducer({
    type: actions.SELLER_REPLY_MESSAGE,
    resultName: 'message'
  }).run()

export const deleteMessage = createReducer(buildInitState())
  .addReducer({
    type: actions.BUYER_DELETE_MESSAGE
  })
  .addReducer({
    type: actions.SELLER_DELETE_MESSAGE
  }).run()

export const transactionMessage = createReducer(buildInitState({ message: {} }))
  .addReducer({
    type: actions.MESSAGE_BUYER,
    resultName: 'message'
  })
  .addReducer({
    type: actions.MESSAGE_SELLER,
    resultName: 'message'
  })
  .addReducer({
    type: actions.MESSAGE_RESELLER,
    resultName: 'message'
  }).run()

import * as actions from '../actions/message'
import { buildReducer, buildType, initState } from '../config'

export const getBuyerMessages = (state = initState({ buyerMessages: [] }), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.GET_BUYER_MESSAGES:
      return buildReducer(state, action, type, 'buyerMessages')
    default:
      return state
  }
}

export const getSellerMessages = (state = initState({ sellerMessages: [] }), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.GET_SELLER_MESSAGES:
      return buildReducer(state, action, type, 'sellerMessages')
    default:
      return state
  }
}

export const getBuyerDetailMessage = (state = initState({ buyerDetailMessage: {} }), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.GET_BUYER_DETAIL_MESSAGE:
      return buildReducer(state, action, type, 'buyerDetailMessage')
    default:
      return state
  }
}

export const getSellerDetailMessage = (state = initState({ sellerDetailMessage: {} }), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.GET_SELLER_DETAIL_MESSAGE:
      return buildReducer(state, action, type, 'sellerDetailMessage')
    default:
      return state
  }
}

export const archiveMessage = (state = initState({ archiveMessage: {} }), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.ARCHIVE_BUYER_MESSAGE:
      return buildReducer(state, action, type, 'archiveMessage')
    case actions.ARCHIVE_SELLER_MESSAGE:
      return buildReducer(state, action, type, 'archiveMessage')
    default:
      return state
  }
}


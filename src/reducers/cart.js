import * as actions from '../actions/cart'
import { buildInitState, createReducer, succState } from '../config'

export const cart = createReducer(buildInitState({ cart: [] }))
  .addReducer({
    type: actions.GET_CART,
    resultName: 'cart',
    includeNonSaga: true,
    resetPrevState: { ...buildInitState() }
  }).run()

export const checkout = createReducer(buildInitState({ checkout: {} }))
  .addReducer({
    type: actions.CHECKOUT,
    resultName: 'checkout',
    keepParams: ['paymentType']
  }).run()

export const addToCart = createReducer(buildInitState({ addToCart: {} }))
  .addReducer({
    type: actions.ADD_TO_CART,
    resultName: 'cart',
    includeNonSaga: true,
    resetPrevState: { ...buildInitState() }
  }).run()

export const countCart = createReducer(buildInitState({ cartCount: 0 }))
  .addReducer({
    type: actions.COUNT_CART,
    customSuccState: (state, action) => ({ cartCount: action.data.count, ...succState(action) })
  }).run()

export const deleteItem = createReducer(buildInitState({ deleteItem: {} }))
  .addReducer({
    type: actions.DELETE_ITEM
  }).run()

export const getPromo = createReducer(buildInitState({ promo: {} }))
  .addReducer({
    type: actions.GET_PROMO,
    resultName: 'promo'
  }).run()

export const cancelPromo = createReducer(buildInitState())
  .addReducer({
    type: actions.CANCEL_PROMO
  }).run()

export const getItem = createReducer(buildInitState({ item: {} }))
  .addReducer({
    type: actions.GET_ITEM,
    resultName: 'item'
  }).run()

export const updateCart = createReducer(buildInitState({ items: [] }))
  .addReducer({
    type: actions.UPDATE_CART,
    resultName: 'items',
    includeNonSaga: true
  }).run()

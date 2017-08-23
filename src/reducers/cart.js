import * as actions from '../actions/cart'
import { buildReducer, buildType, initState } from '../config'

export const cart = (state = initState({ cart: [] }), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.GET_CART:
      return { ...buildReducer(state, action, type, 'cart'), type: 'get' }
    case actions.GET_CART_RESET:
      return { ...initState(), cart: state.cart, type: 'reset' }
    default:
      return state
  }
}

export const checkout = (state = initState({ checkout: {} }), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.CHECKOUT:
      return buildReducer(state, action, type, 'checkout')
    default:
      return state
  }
}

export const addToCart = (state = initState({ addToCart: {} }), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.ADD_TO_CART:
      return buildReducer(state, action, type, 'cart')
    case actions.ADD_TO_CART_RESET:
      return { ...initState(), addToCart: state.addToCart, type: 'reset' }
    default:
      return state
  }
}

export const countCart = (state = initState({ cartCount: 0 }), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.COUNT_CART:
      return buildReducer(state, action, type, 'cartCount')
    default:
      return state
  }
}

export const deleteItem = (state = initState({ deleteItem: {} }), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.DELETE_ITEM:
      return buildReducer(state, action, type, 'deleteItem')
    default:
      return state
  }
}

export const getPromo = (state = initState({ promo: {} }), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.GET_PROMO:
      return buildReducer(state, action, type, 'promo')
    default:
      return state
  }
}

export const cancelPromo = (state = initState(), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.CANCEL_PROMO:
      return buildReducer(state, action, type)
    default:
      return state
  }
}

export const getItem = (state = initState({ item: {} }), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.GET_ITEM:
      return buildReducer(state, action, type, 'item')
    default:
      return state
  }
}

export const updateCart = (state = initState({ items: [] }), action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.UPDATE_CART:
      return buildReducer(state, action, type, 'items')
    case actions.RESET_UPDATE_CART:
      return initState({ items: [] })
    default:
      return state
  }
}

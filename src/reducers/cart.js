import * as actions from '../actions/cart'
import { buildReducer, buildType, initState } from '../config'

const initCart = {
  cart: [],
  ...initState()
}

const initCartCount = {
  cartCount: 0,
  ...initState()
}

const initPromo = {
  promo: {},
  ...initState()
}

export const cart = (state = initCart, action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.ADD_TO_CART:
      return buildReducer(state, action, type, 'cart', true)
    case actions.ADD_TO_CART_RESET:
      return { ...initCart, cart: state.cart }
    case actions.GET_CART:
      return buildReducer(state, action, type, 'cart')
    default:
      return state
  }
}

export const countCart = (state = initCartCount, action) => {
  const type = buildType(action.type)
  switch (type) {
    case actions.COUNT_CART:
      return buildReducer(state, action, type, 'cartCount')
    default:
      return state
  }
}

export const getPromo = (state = initPromo, action) => {
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

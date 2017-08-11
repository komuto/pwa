import * as actions from '../actions/cart'
import * as apis from '../api/cart'
import { buildSaga } from '../config'

export const addToCart = buildSaga([], apis.addToCart, actions.ADD_TO_CART)
export const getCart = buildSaga([], apis.getCart, actions.GET_CART)
export const countCart = buildSaga([], apis.countCart, actions.COUNT_CART, ['count'])
export const getPromo = buildSaga(['code'], apis.getPromo, actions.GET_PROMO)
export const cancelPromo = buildSaga([], apis.cancelPromo, actions.CANCEL_PROMO)
export const checkout = buildSaga([], apis.checkout, actions.CHECKOUT)
export const deleteItem = buildSaga(['id'], apis.deleteItem, actions.DELETE_ITEM, [], ['id'])
export const getItem = buildSaga(['id'], apis.getItem, actions.GET_ITEM)

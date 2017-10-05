import * as actions from '../actions/cart'
import * as apis from '../api/cart'
import { buildSaga } from '../config'

export const addToCart = buildSaga(apis.addToCart, actions.ADD_TO_CART)
export const getCart = buildSaga(apis.getCart, actions.GET_CART)
export const countCart = buildSaga(apis.countCart, actions.COUNT_CART)
export const getPromo = buildSaga(apis.getPromo, actions.GET_PROMO)
export const cancelPromo = buildSaga(apis.cancelPromo, actions.CANCEL_PROMO)
export const checkout = buildSaga(apis.checkout, actions.CHECKOUT, null, null,
  (res, params) => { if (params.paymentType) res.data.paymentType = params.paymentType; return res })
export const deleteItem = buildSaga(apis.deleteItem, actions.DELETE_ITEM)
export const getItem = buildSaga(apis.getItem, actions.GET_ITEM)
export const updateCart = buildSaga(apis.updateCart, actions.UPDATE_CART)

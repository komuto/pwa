import { buildAction, typeReq } from '../config'

export const ADD_TO_CART = 'ADD_TO_CART'
export const ADD_TO_CART_RESET = 'ADD_TO_CART_RESET'
export const GET_PROMO = 'GET_PROMO'
export const CANCEL_PROMO = 'CANCEL_PROMO'
export const COUNT_CART = 'COUNT_CART'
export const GET_CART = 'GET_CART'
export const GET_CART_RESET = 'GET_CART_RESET'
export const CHECKOUT = 'CHECKOUT'
export const DELETE_ITEM = 'DELETE_ITEM'
export const GET_ITEM = 'GET_ITEM'

export const addToCart = params => buildAction(typeReq(ADD_TO_CART), params)
export const addToCartReset = () => buildAction(ADD_TO_CART_RESET)
export const countCart = () => buildAction(typeReq(COUNT_CART))
export const getCart = () => buildAction(typeReq(GET_CART))
export const getCartReset = () => buildAction(GET_CART_RESET)
export const getPromo = params => buildAction(typeReq(GET_PROMO), params)
export const cancelPromo = () => buildAction(typeReq(CANCEL_PROMO))
export const checkout = params => buildAction(typeReq(CHECKOUT), params)
export const deleteItem = params => buildAction(typeReq(DELETE_ITEM), params)
export const getItem = params => buildAction(typeReq(GET_ITEM), params)

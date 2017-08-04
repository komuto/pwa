import { buildAction, typeReq } from '../config'

export const ADD_TO_CART = 'ADD_TO_CART'
export const ADD_TO_CART_RESET = 'ADD_TO_CART_RESET'
export const GET_PROMO = 'GET_PROMO'
export const CANCEL_PROMO = 'CANCEL_PROMO'
export const COUNT_CART = 'COUNT_CART'
export const GET_CART = 'GET_CART'

export const addToCart = params => buildAction(typeReq(ADD_TO_CART), params)
export const addToCartReset = () => buildAction(ADD_TO_CART_RESET)
export const countCart = () => buildAction(typeReq(COUNT_CART))
export const getCart = () => buildAction(typeReq(GET_CART))
export const getPromo = params => buildAction(typeReq(GET_PROMO), params)
export const cancelPromo = () => buildAction(typeReq(CANCEL_PROMO))

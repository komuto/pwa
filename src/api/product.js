import { publicApiKomuto, authApiKomuto } from './api'
import localforage from 'localforage'
import { buildQuery } from '../config'

export const getProduct = ({ id }) => {
  const token = localforage.getItem('token')
  let axios = publicApiKomuto()
  if (token) axios = authApiKomuto()
  return axios.get(`products/${id}`).catch((err) => { throw err })
}

export const getProductBy = (action) => {
  const token = localforage.getItem('token')
  let axios = publicApiKomuto()
  if (token) axios = authApiKomuto()
  if (Array.isArray(action.price) && action.price.length > 0) {
    action.price = action.price.reduce((price, val, index) => {
      // minimum and maximum price can't be 0 to use the api
      // so set the default value if it is 0
      if (index === 0) price += val === 0 ? '50-' : `${val}-`
      else if (index === 1) price += val === 0 ? '1000000000000' : String(val)
      return price
    }, '')
  }
  const take = ['q', 'page', 'limit', 'sort', 'price', 'condition', 'other', 'brands', 'services', 'address', 'category_id']
  const query = buildQuery(action, take)
  return axios.get(`products?${query}`).catch((err) => { throw err })
}

export const addToWishlist = ({ id }) => {
  const axios = authApiKomuto()
  return axios.get(`products/${id}/wishlist`).catch((err) => { throw err })
}

export const addToWishlistHome = ({ id }) => {
  const axios = authApiKomuto()
  return axios.get(`products/${id}/wishlist`).catch((err) => { throw err })
}

export const getDiscussion = ({ id, page, limit }) => {
  const axios = publicApiKomuto()
  const query = buildQuery({ page, limit })
  return axios.get(`products/${id}/discussions?${query}`).catch((err) => { throw err })
}

export const newDiscussion = (action) => {
  const axios = authApiKomuto()
  return axios.post(`products/${action.id}/discussions`, action).catch((err) => { throw err })
}

export const getComment = ({ productId, id, page, limit }) => {
  const axios = publicApiKomuto()
  const query = buildQuery({ page, limit })
  return axios.get(`products/${productId}/discussions/${id}/comments?${query}`).catch((err) => { throw err })
}

export const newComment = (action) => {
  const axios = authApiKomuto()
  return axios.post(`products/${action.productId}/discussions/${action.id}/comments`, action).catch((err) => { throw err })
}

export const reportProduct = (action) => {
  const axios = authApiKomuto()
  return axios.post(`products/${action.id}/report`, action).catch((err) => { throw err })
}

export const createProduct = (action) => {
  const axios = authApiKomuto()
  return axios.post('products', action).catch((err) => { throw err })
}

export const hideProducts = ({ product_ids }) => {
  const axios = authApiKomuto()
  return axios.post('users/store/products/hides', { product_ids }).catch((err) => { throw err })
}

export const deleteProducts = ({ product_ids }) => {
  const axios = authApiKomuto()
  return axios.post('users/store/products', { product_ids }).catch((err) => { throw err })
}

export const changeCatalogProducts = (action) => {
  const axios = authApiKomuto()
  return axios.post('users/store/products/move-catalog', action).catch((err) => { throw err })
}

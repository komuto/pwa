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
  const query = buildQuery(action)
  return axios.get(`products?${query}`).catch((err) => { throw err })
}

export const addToWishlist = ({ id }) => {
  const axios = authApiKomuto()
  return axios.get(`products/${id}/wishlist`).catch((err) => { throw err })
}

export const getDiscussion = ({ id, ...params }) => {
  const axios = publicApiKomuto()
  const query = buildQuery(params)
  return axios.get(`products/${id}/discussions?${query}`).catch((err) => { throw err })
}

export const newDiscussion = ({ id, ...action }) => {
  const axios = authApiKomuto()
  return axios.post(`products/${id}/discussions`, action).catch((err) => { throw err })
}

export const getComment = ({ productId, id, ...params }) => {
  const axios = publicApiKomuto()
  const query = buildQuery(params)
  return axios.get(`products/${productId}/discussions/${id}/comments?${query}`).catch((err) => { throw err })
}

export const newComment = ({ productId, id, ...action }) => {
  const axios = authApiKomuto()
  return axios.post(`products/${productId}/discussions/${id}/comments`, action).catch((err) => { throw err })
}

export const reportProduct = ({ id, ...action }) => {
  const axios = authApiKomuto()
  return axios.post(`products/${id}/report`, action).catch((err) => { throw err })
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

export const updateProduct = ({ id, ...data }) => {
  const axios = authApiKomuto()
  return axios.put(`users/store/products/${id}`, data)
}

export const getProductExpeditions = ({ id }) => {
  const axios = authApiKomuto()
  return axios.get(`users/store/products/${id}/expeditions/manage`)
}

import { publicApiKomuto, authApiKomuto } from './api'
import localforage from 'localforage'
import { buildQuery, filterUpdate } from '../config'

export const getProduct = ({ id }) => {
  const token = localforage.getItem('token')
  let axios = publicApiKomuto()
  if (token) axios = authApiKomuto()
  return axios.get(`products/${id}`)
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
  return axios.get(`products?${query}`)
}

export const addToWishlist = ({ id }) => {
  const axios = authApiKomuto()
  return axios.get(`products/${id}/wishlist`)
}

export const getDiscussion = ({ id, ...params }) => {
  const axios = publicApiKomuto()
  const query = buildQuery(params)
  return axios.get(`products/${id}/discussions?${query}`)
}

export const newDiscussion = ({ id, ...action }) => {
  const axios = authApiKomuto()
  return axios.post(`products/${id}/discussions`, action)
}

export const getComment = ({ id, ...params }) => {
  const axios = publicApiKomuto()
  const query = buildQuery(params)
  return axios.get(`discussions/${id}/comments?${query}`)
}

export const newComment = ({ id, ...action }) => {
  const axios = authApiKomuto()
  return axios.post(`discussions/${id}/comments`, action)
}

export const reportProduct = ({ id, ...action }) => {
  const axios = authApiKomuto()
  return axios.post(`products/${id}/report`, action)
}

export const createProduct = (action) => {
  const axios = authApiKomuto()
  return axios.post('products', action)
}

export const hideProducts = ({ product_ids }) => {
  const axios = authApiKomuto()
  return axios.post('users/store/products/hides', { product_ids })
}

export const deleteProducts = ({ product_ids }) => {
  const axios = authApiKomuto()
  return axios.post('users/store/products', { product_ids })
}

export const changeCatalogProducts = (action) => {
  const axios = authApiKomuto()
  return axios.post('users/store/products/move-catalog', action)
}

export const updateProduct = ({ id, ...data }) => {
  const axios = authApiKomuto()
  return axios.put(`users/store/products/${id}`, filterUpdate(data))
}

export const getProductExpeditions = ({ id }) => {
  const axios = authApiKomuto()
  return axios.get(`users/store/products/${id}/expeditions/manage`)
}

export const addDropshipProducts = ({ id, ...params }) => {
  const axios = authApiKomuto()
  return axios.post(`products/${id}/dropship`, params)
}

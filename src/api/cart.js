import { authApiKomuto } from './api'

export const addToCart = (action) => {
  const axios = authApiKomuto()
  return axios.post('buckets', action)
}

export const getCart = () => {
  const axios = authApiKomuto()
  return axios.get('users/bucket')
}

export const countCart = () => {
  const axios = authApiKomuto()
  return axios.get('buckets/count')
}

export const getPromo = (data) => {
  const axios = authApiKomuto()
  return axios.post(`buckets/promo`, data)
}

export const cancelPromo = () => {
  const axios = authApiKomuto()
  return axios.delete('buckets/promo/cancel', {}, { data: {} })
}

export const checkout = (action = {}) => {
  const axios = authApiKomuto()
  return axios.post('checkout', action)
}

export const deleteItem = ({ id }) => {
  const axios = authApiKomuto()
  return axios.delete(`buckets/items/${id}`, {}, { data: {} })
}

export const getItem = ({ id }) => {
  const axios = authApiKomuto()
  return axios.get(`users/bucket/items/${id}`)
}

export const updateCart = (data) => {
  const axios = authApiKomuto()
  return axios.put('buckets', data)
}

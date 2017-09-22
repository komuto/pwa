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

export const getPromo = ({ code }) => {
  const axios = authApiKomuto()
  return axios.get(`buckets/promo?code=${code}`)
}

export const cancelPromo = () => {
  const axios = authApiKomuto()
  return axios.get('buckets/promo/cancel')
}

export const checkout = (action = {}) => {
  const axios = authApiKomuto()
  return axios.post('checkout', action)
}

export const deleteItem = ({ id }) => {
  const axios = authApiKomuto()
  return axios.delete(`buckets/items/${id}`)
}

export const getItem = ({ id }) => {
  const axios = authApiKomuto()
  return axios.get(`users/bucket/items/${id}`)
}

export const updateCart = (data) => {
  const axios = authApiKomuto()
  return axios.put('buckets', data)
}

import { authApiKomuto } from './api'

export const addToCart = (action) => {
  const axios = authApiKomuto()
  return axios.post('buckets', action).catch((err) => { throw (err) })
}

export const getCart = () => {
  const axios = authApiKomuto()
  return axios.get('users/bucket').catch((err) => { throw err })
}

export const countCart = () => {
  const axios = authApiKomuto()
  return axios.get('buckets/count').catch((err) => { throw err })
}

export const getPromo = ({ code }) => {
  const axios = authApiKomuto()
  return axios.get(`buckets/promo?code=${code}`).catch((err) => { throw err })
}

export const cancelPromo = () => {
  const axios = authApiKomuto()
  return axios.get('buckets/promo/cancel').catch((err) => { throw err })
}

import { authApiKomuto, publicApiKomuto } from './api'
import { buildQuery } from '../config'

export const getReviews = ({ id, ...action }) => {
  const axios = publicApiKomuto()
  const query = buildQuery(action)
  return axios.get(`products/${id}/reviews?${query}`).catch((err) => { throw err })
}

export const addReview = ({ id, ...action }) => {
  let axios = authApiKomuto()
  return axios.post(`products/${id}/reviews`, action).catch((err) => { throw err })
}

import { authApiKomuto, publicApiKomuto } from './api'
import { buildQuery } from '../config'

export const getReviews = ({ id, page, limit }) => {
  const axios = publicApiKomuto()
  const query = buildQuery({ page, limit })
  return axios.get(`products/${id}/reviews?${query}`).catch((err) => { throw err })
}

export const addReview = ({ id, ...action }) => {
  let axios = authApiKomuto()
  return axios.post(`products/${id}/reviews`, action).catch((err) => { throw err })
}

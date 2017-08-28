import { authApiKomuto, publicApiKomuto } from './api'
import { buildQuery } from '../config'

export const getReviews = ({ id, ...action }) => {
  const axios = publicApiKomuto()
  const query = buildQuery(action)
  return axios.get(`products/${id}/reviews?${query}`)
}

export const addReview = ({ id, ...action }) => {
  let axios = authApiKomuto()
  return axios.post(`products/${id}/reviews`, action)
}

export const getBuyerReview = (params) => {
  const axios = authApiKomuto()
  const query = buildQuery(params)
  return axios.get(`users/reviews?${query}`)
}

export const getSellerReview = (params) => {
  const axios = authApiKomuto()
  const query = buildQuery(params)
  return axios.get(`users/store/reviews?${query}`)
}

import { authApiKomuto, publicApiKomuto } from './api'
import { buildQuery } from '../config'

export const getReviews = ({ id, ...action }) => {
  const axios = publicApiKomuto()
  const query = buildQuery(action)
  return axios.get(`products/${id}/reviews?${query}`)
}

export const addReviews = ({ transId, invoiceId, reviews }) => {
  const axios = authApiKomuto()
  return axios.post(`transactions/${transId}/invoices/${invoiceId}`, reviews)
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

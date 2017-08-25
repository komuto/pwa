import { authApiKomuto } from './api'
import { buildQuery } from '../config'

export const getBuyerMessages = (params) => {
  const axios = authApiKomuto()
  const query = buildQuery(params)
  return axios.get(`users/messages?${query}`)
}

export const getSellerMessages = (params) => {
  const axios = authApiKomuto()
  const query = buildQuery(params)
  return axios.get(`users/store/messages?${query}`)
}

export const getBuyerDetailMessage = ({ id }) => {
  const axios = authApiKomuto()
  return axios.get(`/users/messages/${id}`)
}

export const getSellerDetailMessage = ({ id }) => {
  const axios = authApiKomuto()
  return axios.get(`/users/store/messages/${id}`)
}

export const archiveBuyerMessage = ({ id }) => {
  const axios = authApiKomuto()
  return axios.get(`/users/messages/${id}/archive`)
}

export const archiveSellerMessage = ({ id }) => {
  const axios = authApiKomuto()
  return axios.get(`/users/store/messages/${id}/archive`)
}


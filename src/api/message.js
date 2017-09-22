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
  return axios.get(`users/messages/${id}`)
}

export const getSellerDetailMessage = ({ id }) => {
  const axios = authApiKomuto()
  return axios.get(`users/store/messages/${id}`)
}

export const getArchiveBuyerMessages = () => {
  const axios = authApiKomuto()
  return axios.get(`users/messages?is_archived=true`)
}

export const getArchiveSellerMessages = () => {
  const axios = authApiKomuto()
  return axios.get(`users/store/messages?is_archived=true`)
}

export const updateBuyerMessage = ({ id, messageType }) => {
  const axios = authApiKomuto()
  return axios.put(`users/messages/${id}`, { type: messageType })
}

export const updateSellerMessage = ({ id, messageType }) => {
  const axios = authApiKomuto()
  return axios.put(`users/store/messages/${id}`, { type: messageType })
}

export const buyerReplyMessage = ({ id, ...data }) => {
  const axios = authApiKomuto()
  return axios.post(`users/messages/${id}`, data)
}

export const sellerReplyMessage = ({ id, ...data }) => {
  const axios = authApiKomuto()
  return axios.post(`users/store/messages/${id}`, data)
}

export const buyerDeleteMessage = ({ id }) => {
  const axios = authApiKomuto()
  return axios.delete(`users/messages/${id}`)
}

export const sellerDeleteMessage = ({ id }) => {
  const axios = authApiKomuto()
  return axios.delete(`users/store/messages/${id}`)
}

export const messageBuyer = ({ id, ...data }) => {
  const axios = authApiKomuto()
  return axios.post(`invoices/${id}/buyer/message`, data)
}

export const messageSeller = ({ id, ...data }) => {
  const axios = authApiKomuto()
  return axios.post(`invoices/${id}/seller/message`, data)
}

export const messageReseller = ({ id, ...data }) => {
  const axios = authApiKomuto()
  return axios.post(`invoices/${id}/reseller/message`, data)
}

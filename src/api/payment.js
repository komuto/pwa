import { authApiKomuto } from './api'
import { buildQuery } from '../config'

export const getPaymentMethods = () => {
  const axios = authApiKomuto()
  return axios.get('payment-methods')
}

export const confirmTransfer = ({ id, ...action }) => {
  const axios = authApiKomuto()
  return axios.post(`buckets/${id}/bank`, action)
}

export const getMidtransToken = ({ token, id, ...data } = {}) => {
  const axios = authApiKomuto(token, 50000)
  const query = buildQuery(data)
  return axios.get(`transactions/${id}/token?${query}`)
}

export const balancePayment = ({ id }) => {
  const axios = authApiKomuto()
  return axios.put(`transactions/${id}/balance-payment`)
}

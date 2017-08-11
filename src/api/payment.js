import { authApiKomuto } from './api'

export const getPaymentMethods = () => {
  const axios = authApiKomuto()
  return axios.get('payment-methods').catch((err) => { throw err })
}

export const choosePaymentMethod = ({ id, payment_method_id }) => {
  const axios = authApiKomuto()
  return axios.post(`buckets/${id}/payment`, { payment_method_id }).catch((err) => { throw err })
}

export const confirmTransfer = ({ id, ...action }) => {
  const axios = authApiKomuto()
  return axios.post(`buckets/${id}/bank`, action).catch((err) => { throw err })
}

import { authApiKomuto } from './api'

export const getPaymentMethods = () => {
  const axios = authApiKomuto()
  return axios.get('payment-methods')
}

export const confirmTransfer = ({ id, ...action }) => {
  const axios = authApiKomuto()
  return axios.post(`buckets/${id}/bank`, action)
}

export const withdraw = (data) => {
  const axios = authApiKomuto()
  return axios.post('users/saldo/withdraw', data)
}

export const getMidtransToken = ({ token } = {}) => {
  const axios = authApiKomuto(token, 50000)
  return axios.get(`payments`)
}

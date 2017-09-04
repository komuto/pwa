import { authApiKomuto } from './api'

export const getPaymentMethods = () => {
  const axios = authApiKomuto()
  return axios.get('payment-methods')
}

export const confirmTransfer = ({ id, ...action }) => {
  const axios = authApiKomuto()
  return axios.post(`buckets/${id}/bank`, action)
}

export const getDokuInvoice = () => {
  const axios = authApiKomuto()
  return axios.get('payments')
}

export const payDoku = (data) => {
  const axios = authApiKomuto()
  return axios.post('payments', data)
}

export const withdraw = (data) => {
  const axios = authApiKomuto()
  return axios.post('users/saldo/withdraw', data)
}

export const getMidtransToken = () => {
  const axios = authApiKomuto()
  return axios.get('payments')
}

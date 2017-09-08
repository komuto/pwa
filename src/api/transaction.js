import { authApiKomuto } from './api'

export const listTransactions = () => {
  const axios = authApiKomuto()
  return axios.get('transactions')
}

export const getTransaction = ({ id }) => {
  const axios = authApiKomuto()
  return axios.get(`transactions/${id}`)
}

export const getSaldoHistory = () => {
  const axios = authApiKomuto()
  return axios.get('users/saldo/history')
}

export const getBuyerInvoiceDetail = ({ id, invoiceId }) => {
  const axios = authApiKomuto()
  return axios.get(`transactions/${id}/invoices/${invoiceId}`)
}

import { authApiKomuto } from './api'
import { buildQuery } from '../config'

export const getSaldoToken = ({ id }) => {
  const axios = authApiKomuto()
  return axios.get(`saldo/nominal/${id}/token`)
}

export const getNominals = () => {
  const axios = authApiKomuto()
  return axios.get('saldo/nominal')
}

export const getSaldoHistory = () => {
  const axios = authApiKomuto()
  return axios.get('users/saldo/history')
}

export const withdraw = (data) => {
  const axios = authApiKomuto()
  return axios.post('users/saldo/withdraw', data)
}

export const getTopupStatus = (data) => {
  const axios = authApiKomuto()
  const query = buildQuery(data)
  return axios.get(`users/saldo/topup?${query}`)
}

export const getWithdrawStatus = (data) => {
  const axios = authApiKomuto()
  const query = buildQuery(data)
  return axios.get(`users/saldo/withdraw?${query}`)
}

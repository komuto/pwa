import { authApiKomuto } from './api'

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

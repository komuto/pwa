import { publicApiKomuto, authApiKomuto } from './api'

export const listBank = () => {
  let axios = publicApiKomuto()
  return axios.get('banks').catch((err) => { throw err })
}

export const getBank = ({ id }) => {
  let axios = publicApiKomuto()
  return axios.get('banks/' + id).catch((err) => { throw err })
}

export const addBankAccount = (action) => {
  const axios = authApiKomuto()
  return axios.post('accounts/banks', { ...action }).catch((err) => { throw err })
}

export const getBankAccounts = ({ id = '' } = {}) => {
  const axios = authApiKomuto()
  return axios.get(`accounts/banks/${id}`).catch((err) => { throw err })
}

export const updateBankAccount = ({ id, ...data }) => {
  const axios = authApiKomuto()
  return axios.put(`accounts/banks/${id}`, data).catch((err) => { throw err })
}

export const deleteBankAccount = ({ id, ...code }) => {
  const axios = authApiKomuto()
  return axios.delete(`accounts/banks/${id}`, { data: code }).catch((err) => { throw err })
}

export const getKomutoBankAccounts = () => {
  const axios = authApiKomuto()
  return axios.get('banks/komuto').catch((err) => { throw err })
}

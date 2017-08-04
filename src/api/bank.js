import { publicApiKomuto, authApiKomuto } from './api'

export const listBank = (action) => {
  let axios = publicApiKomuto()
  return axios.get('banks', action).catch((err) => { throw err })
}

export const getBank = (action) => {
  let axios = publicApiKomuto()
  return axios.get('banks/' + action.id, action).catch((err) => { throw err })
}

export const addBankAccount = (action) => {
  const axios = authApiKomuto()
  return axios.post('accounts/banks', { ...action }).catch((err) => { throw err })
}

export const getBankAccounts = (id = '') => {
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

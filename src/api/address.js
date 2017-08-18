import { authApiKomuto } from './api'

export const addAddress = (action) => {
  const axios = authApiKomuto()
  return axios.post('users/addresses', action).catch((err) => { throw err })
}

export const updateAddress = (action) => {
  const axios = authApiKomuto()
  return axios.put('users/addresses/' + action.id, action).catch((err) => { throw err })
}

export const deleteAddress = ({ id }) => {
  const axios = authApiKomuto()
  return axios.delete(`users/addresses/${id}`, { data: {} }).catch((err) => { throw err })
}

export const getAddressDetail = ({ id }) => {
  const axios = authApiKomuto()
  return axios.get('users/addresses/' + id).catch((err) => { throw err })
}

export const getListAddress = () => {
  const axios = authApiKomuto()
  return axios.get('users/addresses').catch((err) => { throw err })
}

export const getPrimaryAddress = () => {
  const axios = authApiKomuto()
  return axios.get('users/address').catch((err) => { throw err })
}

import { authApiKomuto } from './api'

export const addAddress = (action) => {
  const axios = authApiKomuto()
  return axios.post('users/addresses', action)
}

export const updateAddress = (action) => {
  const axios = authApiKomuto()
  return axios.put('users/addresses/' + action.id, action)
}

export const deleteAddress = ({ id }) => {
  const axios = authApiKomuto()
  return axios.delete(`users/addresses/${id}`)
}

export const getAddressDetail = ({ id }) => {
  const axios = authApiKomuto()
  return axios.get('users/addresses/' + id)
}

export const getListAddress = () => {
  const axios = authApiKomuto()
  return axios.get('users/addresses')
}

export const getPrimaryAddress = () => {
  const axios = authApiKomuto()
  return axios.get('users/address')
}

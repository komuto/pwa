import { authApiKomuto } from './api'

export const createCatalog = (action) => {
  const axios = authApiKomuto()
  return axios.post('users/store/catalogs', action)
}

export const updateCatalog = (action) => {
  const axios = authApiKomuto()
  return axios.put('users/store/catalogs/' + action.id, action)
}

export const getCatalog = ({ id }) => {
  const axios = authApiKomuto()
  return axios.get('users/store/catalogs/' + id)
}

export const getListCatalog = () => {
  const axios = authApiKomuto()
  return axios.get('users/store/catalogs/')
}

export const deleteCatalog = ({ id }) => {
  const axios = authApiKomuto()
  return axios.delete(`users/store/catalogs/${id}`)
}

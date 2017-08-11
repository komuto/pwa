import { authApiKomuto } from './api'

export const createCatalog = (action) => {
  const axios = authApiKomuto()
  return axios.post('users/store/catalogs', action).catch((err) => { throw err })
}

export const updateCatalog = (action) => {
  const axios = authApiKomuto()
  return axios.put('users/store/catalogs/' + action.id, action).catch((err) => { throw err })
}

export const getCatalog = ({ id }) => {
  const axios = authApiKomuto()
  return axios.get('users/store/catalogs/' + id).catch((err) => { throw err })
}

export const getListCatalog = () => {
  const axios = authApiKomuto()
  return axios.get('users/store/catalogs/').catch((err) => { throw err })
}

export const deleteCatalog = ({ id }) => {
  const axios = authApiKomuto()
  return axios.delete(`users/store/catalogs/${id}`, { data: {} }).catch((err) => { throw err })
}

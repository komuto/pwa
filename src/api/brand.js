import { publicApiKomuto } from './api'

export const getBrand = (action) => {
  const axios = publicApiKomuto()
  return axios.get('brands', action).catch((err) => { throw err })
}

export const getBrandByCategory = (action) => {
  const axios = publicApiKomuto()
  return axios.get(`categories/${action.id}/brands`, action).catch((err) => { throw err })
}

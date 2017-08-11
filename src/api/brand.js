import { publicApiKomuto } from './api'

export const getBrand = () => {
  const axios = publicApiKomuto()
  return axios.get('brands').catch((err) => { throw err })
}

export const getBrandByCategory = ({ id }) => {
  const axios = publicApiKomuto()
  return axios.get(`categories/${id}/brands`).catch((err) => { throw err })
}

import { publicApiKomuto } from './api'

export const getBrand = () => {
  const axios = publicApiKomuto()
  return axios.get('brands')
}

export const getBrandByCategory = ({ id }) => {
  const axios = publicApiKomuto()
  return axios.get(`categories/${id}/brands`)
}

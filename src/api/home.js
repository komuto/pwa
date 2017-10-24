import { publicApiKomuto } from './api'
import { buildQuery } from '../config'

export const search = (data) => {
  const axios = publicApiKomuto()
  const query = buildQuery(data)
  return axios.get(`products/search?${query}`)
}

export const allCategory = () => {
  const axios = publicApiKomuto()
  return axios.get('categories/sub')
}

export const getCategories = ({ id = '' } = {}) => {
  const axios = publicApiKomuto()
  return axios.get(`categories/${id}`)
}

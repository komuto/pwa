import { publicApiKomuto } from './api'

export const search = ({ query }) => {
  const axios = publicApiKomuto()
  return axios.get(`products/search?q=${query}`)
}

export const allCategory = () => {
  const axios = publicApiKomuto()
  return axios.get('categories/sub')
}

export const getCategories = ({ id = '' } = {}) => {
  const axios = publicApiKomuto()
  return axios.get(`categories/${id}`)
}

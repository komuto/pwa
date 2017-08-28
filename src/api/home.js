import { publicApiKomuto } from './api'

export const search = ({ query }) => {
  const axios = publicApiKomuto()
  return axios.get(`products/search?q=${query}`).catch((err) => { throw err })
}

export const allCategory = () => {
  const axios = publicApiKomuto()
  return axios.get('categories/sub').catch((err) => { throw err })
}

export const getCategories = ({ id = '' } = {}) => {
  const axios = publicApiKomuto()
  return axios.get(`categories/${id}`).catch((err) => { throw err })
}

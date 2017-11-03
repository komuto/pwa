import { authApiKomuto, publicApiKomuto } from './api'
import { buildQuery } from '../config'

export const getCommission = (data) => {
  const axios = authApiKomuto()
  const query = buildQuery(data)
  return axios.get(`commissions?${query}`)
}

export const getSaleCount = () => {
  const axios = authApiKomuto()
  return axios.get('pages/store')
}

export const getMarketPlace = () => {
  const axios = publicApiKomuto()
  return axios.get('marketplace')
}

import { publicApiKomuto } from './api'
import { buildQuery } from '../config'

export const getProvince = () => {
  const axios = publicApiKomuto()
  return axios.get('locations/provinces')
}

export const getDistrict = (action) => {
  const axios = publicApiKomuto()
  const query = buildQuery(action)
  return axios.get(`locations/districts?${query}`)
}

export const getSubDistrict = (action) => {
  const axios = publicApiKomuto()
  const query = buildQuery(action)
  return axios.get(`locations/sub-districts?${query}`)
}

export const getVillage = (action) => {
  const axios = publicApiKomuto()
  const query = buildQuery(action)
  return axios.get(`locations/villages?${query}`)
}

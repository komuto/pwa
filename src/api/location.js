import { publicApiKomuto } from './api'
import { buildQuery } from '../config'

export const getProvince = (action) => {
  const axios = publicApiKomuto()
  return axios.get('locations/provinces').catch((err) => { throw err })
}

export const getDistrict = (action) => {
  const axios = publicApiKomuto()
  const query = buildQuery(action)
  return axios.get(`locations/districts?${query}`).catch((err) => { throw err })
}

export const getSubDistrict = (action) => {
  const axios = publicApiKomuto()
  const query = buildQuery(action)
  return axios.get(`locations/sub-districts?${query}`).catch((err) => { throw err })
}

export const getVillage = (action) => {
  const axios = publicApiKomuto()
  const query = buildQuery(action)
  return axios.get(`locations/villages?${query}`).catch((err) => { throw err })
}

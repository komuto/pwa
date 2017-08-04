import { publicApiKomuto, authApiKomuto, publicApi } from './api'

export const getExpedition = (action) => {
  let axios = publicApiKomuto()
  return axios.get('expeditions', action).catch((err) => { throw err })
}

export const getServices = (action) => {
  let axios = publicApiKomuto()
  return axios.get('expeditions/services', action).catch((err) => { throw err })
}

export const estimatedShipping = ({ id, origin_id: oriId, destination_id: destId, weight }) => {
  let axios = publicApi()
  return axios.get(`expeditions/cost?product_id=${id}&origin_ro_id=${oriId}&destination_ro_id=${destId}&weight=${weight}`).catch((err) => { throw err })
}

export const getShippingCharge = ({ id, origin_id: oriId, destination_id: destId, weight }) => {
  let axios = publicApiKomuto()
  return axios.get(`expeditions/${id}/cost?origin_ro_id=${oriId}&destination_ro_id=${destId}&weight=${weight}`).catch((err) => { throw err })
}

export const updateExpedition = ({ data }) => {
  let axios = authApiKomuto()
  return axios.put('users/store/expeditions', data).catch((err) => { throw err })
}

export const getStoreExpeditions = () => {
  const axios = authApiKomuto()
  return axios.get('users/store/expeditions').catch((err) => { throw err })
}

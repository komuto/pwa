import { publicApiKomuto, authApiKomuto } from './api'

export const getExpedition = () => {
  const axios = publicApiKomuto()
  return axios.get('expeditions').catch((err) => { throw err })
}

export const getServices = () => {
  const axios = publicApiKomuto()
  return axios.get('expeditions/services').catch((err) => { throw err })
}

export const estimatedShipping = ({ id, origin_id: oriId, destination_id: destId, weight }) => {
  const axios = publicApiKomuto()
  return axios.get(`expeditions/cost?product_id=${id}&origin_ro_id=${oriId}&destination_ro_id=${destId}&weight=${weight}`).catch((err) => { throw err })
}

export const getShippingCharge = ({ id, origin_id: oriId, destination_id: destId, weight }) => {
  const axios = publicApiKomuto()
  return axios.get(`expeditions/${id}/cost?origin_ro_id=${oriId}&destination_ro_id=${destId}&weight=${weight}`)
}

export const updateExpedition = ({ data }) => {
  const axios = authApiKomuto()
  return axios.put('users/store/expeditions', data).catch((err) => { throw err })
}

export const getStoreExpeditions = () => {
  const axios = authApiKomuto()
  return axios.get('users/store/expeditions').catch((err) => { throw err })
}

export const manageStoreExpeditions = () => {
  const axios = authApiKomuto()
  return axios.get('users/store/expeditions/manage').catch((err) => { throw err })
}

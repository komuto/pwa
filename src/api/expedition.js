import { publicApiKomuto } from './api'

function getExpedition (action) {
  let axios = publicApiKomuto()
  return axios.get('expeditions', {
    ...action
  })
  .then(function (data) {
    return data
  })
  .catch(function (err) {
    throw (err)
  })
}

function getServices (action) {
  let axios = publicApiKomuto()
  return axios.get('expeditions/services', {
    ...action
  })
  .then(function (data) {
    return data
  })
  .catch(function (err) {
    throw (err)
  })
}

export {
  getExpedition,
  getServices
}

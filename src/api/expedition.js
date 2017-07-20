import { publicApiKomuto, authApiKomuto, publicApi } from './api'

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

function estimatedShipping (action) {
  let axios = publicApi()
  return axios.get('expeditions/cost?product_id=' + action.id + '&origin_ro_id=' + action.origin_id + '&destination_ro_id=' + action.destination_id + '&weight=' + action.weight, {
    ...action
  })
  .then(function (data) {
    return data
  })
  .catch(function (err) {
    throw (err)
  })
}

function getShippingCharge (action) {
  let axios = publicApiKomuto()
  return axios.get('expeditions/' + action.id + '/cost?origin_ro_id=' + action.origin_id + '&destination_ro_id=' + action.destination_id + '&weight=' + action.weight, {
    ...action
  })
  .then(function (data) {
    return data
  })
  .catch(function (err) {
    throw (err)
  })
}

function updateExpedition (action) {
  let axios = authApiKomuto()
  return axios({
    method: 'put',
    url: 'users/store/expeditions',
    data: action.data
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
  getServices,
  estimatedShipping,
  getShippingCharge,
  updateExpedition
}

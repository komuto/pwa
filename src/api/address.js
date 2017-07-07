import { authApiKomuto } from './api'

function addAddress (action) {
  let axios = authApiKomuto()
  return axios.post('users/addresses', {
    ...action
  })
  .then(function (data) {
    return data
  })
  .catch(function (err) {
    throw (err)
  })
}

function updateAddress (action) {
  let axios = authApiKomuto()
  return axios.put('users/addresses/' + action.id, {
    ...action
  })
  .then(function (data) {
    return data
  })
  .catch(function (err) {
    throw (err)
  })
}

function deleteAddress (action) {
  let axios = authApiKomuto()
  return axios({
    method: 'delete',
    url: 'users/addresses/' + action.id,
    data: {}
  })
  .then(function (data) {
    return data
  })
  .catch(function (err) {
    throw (err)
  })
}

function getAddressDetail (action) {
  let axios = authApiKomuto()
  return axios.get('users/addresses/' + action.id, {
    ...action
  })
  .then(function (data) {
    return data
  })
  .catch(function (err) {
    throw (err)
  })
}

function getListAddress (action) {
  let axios = authApiKomuto()
  return axios.get('users/addresses', {
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
  addAddress,
  updateAddress,
  deleteAddress,
  getAddressDetail,
  getListAddress
}

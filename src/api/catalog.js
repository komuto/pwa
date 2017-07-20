import { authApiKomuto } from './api'

function createCatalog (action) {
  let axios = authApiKomuto()
  return axios.post('users/store/catalogs', {
    ...action
  })
  .then(function (data) {
    return data
  })
  .catch(function (err) {
    throw (err)
  })
}

function updateCatalog (action) {
  let axios = authApiKomuto()
  return axios.put('users/store/catalogs/' + action.id, {
    ...action
  })
  .then(function (data) {
    return data
  })
  .catch(function (err) {
    throw (err)
  })
}

function getCatalog (action) {
  let axios = authApiKomuto()
  return axios.get('users/store/catalogs/' + action.id, {
    ...action
  })
  .then(function (data) {
    return data
  })
  .catch(function (err) {
    throw (err)
  })
}

function getListCatalog (action) {
  let axios = authApiKomuto()
  return axios.get('users/store/catalogs/', {
    ...action
  })
  .then(function (data) {
    return data
  })
  .catch(function (err) {
    throw (err)
  })
}

function deleteCatalog (action) {
  let axios = authApiKomuto()
  return axios({
    method: 'delete',
    url: 'users/store/catalogs/' + action.id,
    data: {}
  })
  .then(function (data) {
    return data
  })
  .catch(function (err) {
    throw (err)
  })
}

export {
  createCatalog,
  updateCatalog,
  getCatalog,
  getListCatalog,
  deleteCatalog
}

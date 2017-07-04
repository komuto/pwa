import { publicApiKomuto } from './api'

function getBrand (action) {
  let axios = publicApiKomuto()
  return axios.get('brands', {
    ...action
  })
  .then(function (data) {
    return data
  })
  .catch(function (err) {
    throw (err)
  })
}

function getBrandByCategory (action) {
  let axios = publicApiKomuto()
  return axios.get('categories/' + action.id + '/brands', {
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
  getBrand,
  getBrandByCategory
}

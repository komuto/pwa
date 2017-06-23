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

export {
  getBrand
}

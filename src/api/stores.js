import { publicApiKomuto } from './api'

function getStores (action) {
  let axios = publicApiKomuto()
  return axios.get('stores/' + action.id, {
    ...action
  })
  .then(function (data) {
    return data
  })
  .catch(function (err) {
    return (err)
  })
}

export {
    getStores
}

import { publicApiKomuto } from './api'

function listBank (action) {
  let axios = publicApiKomuto()
  return axios.get('banks', {
    ...action
  })
  .then(function (data) {
    return data
  })
  .catch(function (err) {
    throw (err)
  })
}

function getBank (action) {
  let axios = publicApiKomuto()
  return axios.get('banks/' + action.id, {
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
  listBank,
  getBank
}

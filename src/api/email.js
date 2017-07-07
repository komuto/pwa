import { publicApiKomuto } from './api'

function checkEmail (action) {
  let axios = publicApiKomuto()
  return axios.post('accounts/email/check', {
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
  checkEmail
}

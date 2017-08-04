import { publicApiKomuto } from './api'

export const checkEmail = (action) => {
  const axios = publicApiKomuto()
  return axios.post('accounts/email/check', action).catch((err) => { throw err })
}

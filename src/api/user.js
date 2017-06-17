import { authApi, publicApi, publicApiKomuto } from './api'

function register (action) {
  let axios = publicApiKomuto()
  return axios.post('users', {
    ...action
  })
}

function login (action) {
  let axios = publicApiKomuto()
  return axios.post('users/login', {
    ...action
  })
}

function loginSocial (action) {
  let axios = publicApi()
  return axios.post('users/social-login', {
    ...action
  })
}

function forgetPassword (action) {
  let axios = publicApi()
  return axios.post('passwords/forgot', {
    ...action
  })
}

function newPassword (action) {
  let axios = authApi()
  return axios.put('users', {
    ...action
  })
}

export {
  login,
  loginSocial,
  register,
  forgetPassword,
  newPassword
}

import { authApi, publicApi, authApiKomuto, publicApiKomuto } from './api'

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

function getProfile (action) {
  let axios = authApiKomuto()
  return axios.get('users/' + action.id, {
    ...action
  })
}

function loginSocial (action) {
  let axios = publicApiKomuto()
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
  getProfile,
  loginSocial,
  register,
  forgetPassword,
  newPassword
}

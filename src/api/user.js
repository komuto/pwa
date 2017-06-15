import { authApi, publicApi } from './api'

function register (action) {
  let axios = publicApi()
  return axios.post('users', {
    ...action
  })
}

function login (action) {
  let axios = authApi()
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

export {
  login,
  // loginAuth,
  loginSocial,
  register,
  forgetPassword
}

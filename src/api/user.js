import { authApiKomuto, publicApiKomuto } from './api'

function register (action) {
  let axios = publicApiKomuto()
  return axios.post('users', {
    ...action
  })
  .then(function (data) {
    return data
  })
  .catch(function (err) {
    throw (err)
  })
}

function verification (action) {
  let axios = publicApiKomuto()
  return axios.get('signup-verification?token=' + action.token, {
    ...action
  })
  .then(function (data) {
    return data
  })
  .catch(function (err) {
    throw (err)
  })
}

function login (action) {
  let axios = publicApiKomuto()
  return axios.post('users/login', {
    ...action
  })
  .then(function (data) {
    return data
  })
  .catch(function (err) {
    throw (err)
  })
}

function loginSocial (action) {
  let axios = publicApiKomuto()
  return axios.post('users/social-login', {
    ...action
  })
  .then(function (data) {
    return data
  })
  .catch(function (err) {
    throw (err)
  })
}

function forgetPassword (action) {
  let axios = publicApiKomuto()
  return axios.post('passwords/forgot', {
    ...action
  })
  .then(function (data) {
    return data
  })
  .catch(function (err) {
    throw (err)
  })
}

function newPassword (action) {
  let axios = publicApiKomuto()
  return axios.put('passwords/new', {
    ...action
  })
  .then(function (data) {
    return data
  })
  .catch(function (err) {
    throw (err)
  })
}

function getProfile (action) {
  let axios = authApiKomuto()
  return axios.get('users/profile', {
    ...action
  })
  .then(function (data) {
    return data
  })
  .catch(function (err) {
    throw (err)
  })
}

function validateToken (action) {
  let axios = publicApiKomuto()
  return axios.get('passwords/new?token=' + action.token, {
    ...action
  })
  .then(function (data) {
    return data
  })
  .catch(function (err) {
    throw (err)
  })
}

function logout (action) {
  let data = {
    message: 'LOGOUT SUCCESS',
    code: 0
  }
  return data
}

export {
  login,
  loginSocial,
  verification,
  logout,
  register,
  forgetPassword,
  newPassword,
  getProfile,
  validateToken
}

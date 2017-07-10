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

function changePassword (action) {
  let axios = authApiKomuto()
  return axios.put('users/password', {
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

function getBalance (action) {
  let axios = authApiKomuto()
  return axios.get('users/balance', {
    ...action
  })
  .then(function (data) {
    return data
  })
  .catch(function (err) {
    throw (err)
  })
}

function updateProfile (action) {
  let axios = authApiKomuto()
  // date_of_birth format is mm/dd/yyyy
  if (action.date_of_birth !== undefined || action.date_of_birth !== '') {
    let tempDate = action.date_of_birth
    tempDate = tempDate.split('/')
    let day = parseInt(tempDate[1]) + 2
    tempDate[1] = String(day)
    let timeStamp = new Date(tempDate).getTime() / 1000
    action.date_of_birth = timeStamp
  }
  console.log(action.date_of_birth)
  return axios.put('users', {
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
  changePassword,
  getProfile,
  validateToken,
  getBalance,
  updateProfile
}

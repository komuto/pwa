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

function getProfileManage (action) {
  let axios = authApiKomuto()
  return axios.get('accounts/profile', {
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
  // console.log(action.date_of_birth)
  return axios.put('accounts/profile', {
    ...action
  })
  .then(function (data) {
    return data
  })
  .catch(function (err) {
    throw (err)
  })
}

function favoriteStore (action) {
  let axios = authApiKomuto()
  return axios.post('stores/' + action.id + '/favorite', {
    ...action
  })
  .then(function (data) {
    return data
  })
  .catch(function (err) {
    throw (err)
  })
}

function addToBucket (action) {
  let axios = authApiKomuto()
  return axios.post('buckets', {
    ...action
  })
  .then(function (data) {
    return data
  })
  .catch(function (err) {
    throw (err)
  })
}

function countBucket (action) {
  let axios = authApiKomuto()
  return axios.get('buckets/count', {
    ...action
  })
  .then(function (data) {
    return data
  })
  .catch(function (err) {
    throw (err)
  })
}

function getBucket (action) {
  let axios = authApiKomuto()
  return axios.get('users/bucket', {
    ...action
  })
  .then(function (data) {
    return data
  })
  .catch(function (err) {
    throw (err)
  })
}

function getPhone (action) {
  let axios = authApiKomuto()
  return axios.get('accounts/phone', {
    ...action
  })
  .then(function (data) {
    return data
  })
  .catch(function (err) {
    return (err)
  })
}

function updatePhone (action) {
  let axios = authApiKomuto()
  return axios.put('accounts/phone', {
    ...action
  })
  .then(function (data) {
    return data
  })
  .catch(function (err) {
    throw (err)
  })
}

function getDiscussion (action) {
  let axios = authApiKomuto()
  return axios.get('users/discussions', {
    ...action
  })
  .then(function (data) {
    return data
  })
  .catch(function (err) {
    throw (err)
  })
}

function listFavoriteStore (action) {
  let axios = authApiKomuto()
  let params = ''
  let check = [
    {value: action.page, string: 'page'},
    {value: action.limit, string: 'limit'}
  ]
  let indexCheck = []
  check.map(function (obj, index) {
    if (obj.value === undefined || obj.value === '') {
      // do nothing
    } else {
      indexCheck.push(index)
    }
  })
  if (indexCheck.length !== 0) {
    params = '?'
  }
  indexCheck.map(function (obj, index) {
    if (index !== indexCheck.length - 1) {
      params = params + check[obj].string + '=' + check[obj].value + '&'
    } else {
      params = params + check[obj].string + '=' + check[obj].value
    }
  })
  return axios.get('users/store/favorites' + params, {
    ...action
  })
  .then(function (data) {
    return data
  })
  .catch(function (err) {
    throw (err)
  })
}

function sendOTPPhone (action) {
  let axios = authApiKomuto()
  return axios.post('accounts/otp/phone', {
    ...action
  })
  .then(function (data) {
    return data
  })
  .catch(function (err) {
    throw (err)
  })
}

function verifyPhone (action) {
  let axios = authApiKomuto()
  return axios.post('accounts/phone/verify', {
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
  updateProfile,
  favoriteStore,
  addToBucket,
  countBucket,
  getBucket,
  getProfileManage,
  getPhone,
  updatePhone,
  getDiscussion,
  listFavoriteStore,
  sendOTPPhone,
  verifyPhone
}
